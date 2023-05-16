import { store } from '@/store'

import FormStepsIndicator from '@/components/form-steps-indicator/form-steps-indicator'
import FormStartFirstProject from '@/components/form-start-first-project/form-start-first-project'
import FormProjectDetails from '@/components/form-project-details/form-project-details'

import styles from './page.module.scss'

export default function Home() {
  const currentStep = store.getState().form.currentStep
  const url = store.getState().form.formStepsData.startFirstProject.url
  return (
    <main className={styles.page}>
      <FormStepsIndicator currentStep={currentStep} />

      {currentStep === 1 && <FormStartFirstProject />}
      {currentStep === 2 && <FormProjectDetails />}
    </main>
  )
}
