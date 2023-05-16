import { revalidatePath } from 'next/cache'

import { store } from '@/store'
import { ICreateProject, nextStep, prevStep, setCreateProjectData } from '@/store/formSlice'

const getFormattedData = (formData: FormData) => {
  const formattedData: ICreateProject = {
    workersAmount: Number(formData.get('workerAmount') as string),
    email: formData.get('email') as string,
    launchType: formData.get('launchType') as string,
  }

  return formattedData
}

function FormCreateProject() {
  const defaultWorkersAmount = store.getState().form.formStepsData.createProject.workersAmount || 1
  const defaultLaunchType = store.getState().form.formStepsData.createProject.launchType || ''
  const defaultEmail = store.getState().form.formStepsData.createProject.email || ''

  async function handleSubmit(formData: FormData) {
    'use server'
    store.dispatch(nextStep())
    store.dispatch(setCreateProjectData(getFormattedData(formData)))
    revalidatePath('/')
  }

  async function handleBack(formData: FormData) {
    'use server'
    store.dispatch(prevStep())
    store.dispatch(setCreateProjectData(getFormattedData(formData)))
    revalidatePath('/')
  }
  return (
    <main>
      <h2>Create Project</h2>

      <form action={handleSubmit}>
        <div>
          <label htmlFor='workersAmount'>How many full-time workers on project?</label>
          <input
            id='workersAmount'
            type='number'
            name='workersAmount'
            defaultValue={defaultWorkersAmount}
          />
        </div>

        <div>
          <label htmlFor='launchType'>Are you pre or post product launch?</label>
          <div>
            <input
              id='Pre-Product'
              type='radio'
              name='mainGoal'
              value='Pre Product'
              defaultChecked={defaultLaunchType === 'Pre Product'}
            />
            <label htmlFor='Pre-Product'>Pre Product</label>
          </div>

          <div>
            <input
              id='Post-Product'
              type='radio'
              name='mainGoal'
              value='Post Product'
              defaultChecked={defaultLaunchType === 'Post Product'}
            />
            <label htmlFor='Post-Product'>Post Product</label>
          </div>
        </div>

        <div>
          <label htmlFor='email'>Contact Email</label>
          <input
            id='email'
            type='text'
            name='email'
            defaultValue={defaultEmail}
            placeholder='Project Email'
          />
        </div>

        <div>
          <button formAction={handleBack}>Back</button>
          <button type='submit'>Continue</button>
        </div>
      </form>
    </main>
  )
}

export default FormCreateProject
