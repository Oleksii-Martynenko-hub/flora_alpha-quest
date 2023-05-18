// create redux toolkit slice for form with steps
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '.'

export enum LOCAL_DATA {
  CURRENT_STEP = 'alpha-quest_currentStep',
  START_FIRST_PROJECT = 'alpha-quest_startFirstProject',
  PROJECT_DETAILS = 'alpha-quest_projectDetails',
  CREATE_PROJECT = 'alpha-quest_createProject',
}

export interface IProject {
  id: string
  workersAmount: number
  launchType: string
  email: string
  mainGoal: string
  name: string
  url: string
  category: string[]
}

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
  launchType: string
  email: string
}

export interface IFormStepsData {
  startFirstProject: IStartFirstProject | undefined
  projectDetails: IProjectDetails | undefined
  createProject: ICreateProject | undefined
}

export interface IFormState {
  currentStep: number
  formStepsData: IFormStepsData
  status: IAPIStatus
}
export interface IAPIStatus {
  isLoading: boolean
  isSuccess: boolean
  isRejected: boolean
  error: string | null
}

const initialState: IFormState = {
  currentStep: 1,
  formStepsData: {
    startFirstProject: undefined,
    projectDetails: undefined,
    createProject: undefined,
  },
  status: {
    isLoading: false,
    isSuccess: false,
    isRejected: false,
    error: null,
  },
}

export const createProjectAsync = createAsyncThunk<void, ICreateProject>(
  'form/createProjectAsync',
  async (createProject, { rejectWithValue, extra, getState, dispatch }) => {
    try {
      const state = getState() as RootState
      const { startFirstProject, projectDetails } = state.form.formStepsData

      if (!startFirstProject || !projectDetails || !createProject) return rejectWithValue(null)

      const newProject: IProject = {
        id: Date.now().toString() + '_' + Math.random().toString(),
        ...startFirstProject,
        ...projectDetails,
        ...createProject,
      }

      await fetch(process.env.API_URL + '/projects', {
        method: 'POST',
        body: JSON.stringify(newProject),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      dispatch(resetState())
    } catch (error) {
      console.log(error)
      return rejectWithValue(error)
    }
  },
)

export const formSlice = createSlice({
  name: 'form',
  initialState,

  reducers: {
    nextStep: (state) => {
      if (state.currentStep >= 3) {
        state.currentStep = 3
        return
      }

      state.currentStep += 1
    },

    setStep: (state, { payload }: PayloadAction<number>) => {
      if (payload < 1 || payload > 3) return
      state.currentStep = payload
    },

    prevStep: (state) => {
      if (state.currentStep <= 1) {
        state.currentStep = 1
        return
      }

      state.currentStep -= 1
    },
    setStartFirstProjectData: (state, { payload }: PayloadAction<IStartFirstProject>) => {
      state.formStepsData.startFirstProject = payload
    },

    setProjectDetailsData: (state, { payload }: PayloadAction<IProjectDetails>) => {
      state.formStepsData.projectDetails = payload
    },

    setCreateProjectData: (state, { payload }: PayloadAction<ICreateProject>) => {
      state.formStepsData.createProject = payload
    },
    resetState: (state) => {
      state = initialState
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createProjectAsync.pending, (state) => {
      state.status.isLoading = true
      state.status.isSuccess = false
      state.status.isRejected = false
    })
    builder.addCase(createProjectAsync.rejected, (state) => {
      state.status.isLoading = false
      state.status.isRejected = true
    })
    builder.addCase(createProjectAsync.fulfilled, (state) => {
      state.status.isLoading = false
      state.status.isSuccess = true
    })
  },
})

export const {
  nextStep,
  setStep,
  prevStep,
  setStartFirstProjectData,
  setProjectDetailsData,
  setCreateProjectData,
  resetState,
} = formSlice.actions
export default formSlice.reducer

export const selectCurrentStep = (state: RootState) => state.form.currentStep
export const selectFormStepsData = (state: RootState) => state.form.formStepsData

export const selectStartFirstProjectData = (state: RootState) => {
  return state.form.formStepsData.startFirstProject
}
export const selectProjectDetailsData = (state: RootState) => {
  return state.form.formStepsData.projectDetails
}
export const selectCreateProjectData = (state: RootState) => {
  return state.form.formStepsData.createProject
}

export const selectAPIStatus = (state: RootState) => {
  return state.form.status
}
