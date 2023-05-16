// create redux toolkit slice for form with steps
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface IStartFirstProject {
  name: string
  url: string
  category: string[]
}

export interface IProjectDetails {
  mainGoal: string
}

export interface ICreateProject {
  workersAmount: number
  launchType: 'pre' | 'post'
  email: string
}

export interface IFormStepsData {
  startFirstProject: IStartFirstProject
  projectDetails: IProjectDetails
  createProject: ICreateProject
}

export interface IFormState {
  currentStep: number
  formStepsData: IFormStepsData
}

const initialState: IFormState = {
  currentStep: 1,
  formStepsData: {
    startFirstProject: {
      name: '',
      url: '',
      category: [],
    },
    projectDetails: {
      mainGoal: '',
    },
    createProject: {
      workersAmount: 0,
      launchType: 'pre',
      email: '',
    },
  },
}

export const formSlice = createSlice({
  name: 'form',
  initialState,

  reducers: {
    nextStep: (state) => {
      state.currentStep += 1
    },
    prevStep: (state) => {
      state.currentStep -= 1
    },
    setStartStepData: (state, { payload }: PayloadAction<IStartFirstProject>) => {
      state.formStepsData.startFirstProject = payload
    },
    setProjectDetailsData: (state, { payload }: PayloadAction<IProjectDetails>) => {
      state.formStepsData.projectDetails = payload
    },
    setCreateProjectData: (state, { payload }: PayloadAction<ICreateProject>) => {
      state.formStepsData.createProject = payload
    },
  },
})

export const { nextStep, prevStep, setStartStepData, setProjectDetailsData, setCreateProjectData } =
  formSlice.actions
export default formSlice.reducer
