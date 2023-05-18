import { useLayoutEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  ICreateProject,
  IProjectDetails,
  IStartFirstProject,
  LOCAL_DATA,
  selectCurrentStep,
  selectProjectDetailsData,
  selectStartFirstProjectData,
  setCreateProjectData,
  setProjectDetailsData,
  setStartFirstProjectData,
  setStep,
} from '@/store/formSlice'

import { useLocalStorage } from './useLocalStorage'

export function useLoadLocalStore() {
  const dispatch = useDispatch()
  const isLoading = useRef(true)

  const currentStep = useSelector(selectCurrentStep)
  const startFirstProject = useSelector(selectStartFirstProjectData)
  const projectDetails = useSelector(selectProjectDetailsData)
  const createProject = useSelector(selectProjectDetailsData)

  const [localCurrentStep] = useLocalStorage<number>(LOCAL_DATA.CURRENT_STEP)
  const [localStartFirstProject] = useLocalStorage<IStartFirstProject | undefined>(
    LOCAL_DATA.START_FIRST_PROJECT,
  )
  const [localProjectDetails] = useLocalStorage<IProjectDetails | undefined>(
    LOCAL_DATA.PROJECT_DETAILS,
  )
  const [localCreateProject] = useLocalStorage<ICreateProject | undefined>(
    LOCAL_DATA.CREATE_PROJECT,
  )

  useLayoutEffect(() => {
    if (!isLoading.current) return

    if (localCurrentStep && localCurrentStep !== currentStep) {
      dispatch(setStep(localCurrentStep))
    }

    if (!startFirstProject) {
      dispatch(
        setStartFirstProjectData(
          localStartFirstProject || {
            name: '',
            url: '',
            category: [],
          },
        ),
      )
    }

    if (!projectDetails) {
      dispatch(setProjectDetailsData(localProjectDetails || { mainGoal: '' }))
    }

    if (!createProject) {
      dispatch(
        setCreateProjectData(localCreateProject || { workersAmount: 0, launchType: '', email: '' }),
      )
    }

    isLoading.current = false
  }, [])

  return isLoading.current
}
