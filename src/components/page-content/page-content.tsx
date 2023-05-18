import { useSelector } from 'react-redux'

import { LOCAL_DATA, selectCurrentStep } from '@/store/formSlice'

import { useLocalStorage } from '@/components/hooks/useLocalStorage'

import FormWrapper from '@/components/form-wrapper/form-wrapper'
import FormCreateProject from '@/components/form-create-project/form-create-project'
import FormProjectDetails from '@/components/form-project-details/form-project-details'
import FormStepsIndicator from '@/components/form-steps-indicator/form-steps-indicator'
import FormStartFirstProject from '@/components/form-start-first-project/form-start-first-project'
import { useLayoutEffect } from 'react'
import { useLoadLocalStore } from '../hooks/useLoadLocalStore'

function PageContent() {
  const currentStep = useSelector(selectCurrentStep)
  const [localCurrentStep, setLocalCurrentStep] = useLocalStorage<number>(LOCAL_DATA.CURRENT_STEP)

  const isLoading = useLoadLocalStore()

  useLayoutEffect(() => {
    if (localCurrentStep !== currentStep) {
      setLocalCurrentStep(currentStep)
    }
  }, [currentStep])

  if (isLoading) {
    return <div>Loading...</div>
  }

  const formTitle =
    currentStep === 1
      ? 'To Create Quest you need firstly create Project'
      : currentStep === 2
      ? 'Project details'
      : 'Create project'

  return (
    <section>
      <FormStepsIndicator currentStep={currentStep} />

      <FormWrapper title={formTitle}>
        {currentStep === 1 ? (
          <FormStartFirstProject />
        ) : currentStep === 2 ? (
          <FormProjectDetails />
        ) : (
          <FormCreateProject />
        )}
      </FormWrapper>
    </section>
  )
}

export default PageContent
