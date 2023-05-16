import { revalidatePath } from 'next/cache'

import { store } from '@/store'
import { IProjectDetails, nextStep, prevStep, setProjectDetailsData } from '@/store/formSlice'

const getFormattedData = (formData: FormData) => {
  const formattedData: IProjectDetails = {
    mainGoal: formData.get('mainGoal') as string,
  }

  return formattedData
}

function FormProjectDetails() {
  const goals = ['Grow My Community', 'Activate Existing Members', 'Understand My Members', 'Other']

  const defaultGoal = store.getState().form.formStepsData.projectDetails.mainGoal || ''

  async function handleSubmit(formData: FormData) {
    'use server'
    store.dispatch(nextStep())

    store.dispatch(setProjectDetailsData(getFormattedData(formData)))

    revalidatePath('/')
  }

  async function handleBack(formData: FormData) {
    'use server'
    store.dispatch(prevStep())

    store.dispatch(setProjectDetailsData(getFormattedData(formData)))

    revalidatePath('/')
  }

  return (
    <main>
      <h2>
        <p>Project Details</p>
        What is your main goal with AlphaQuest <span>?</span>
      </h2>

      <form action={handleSubmit}>
        <div>
          {goals.map((goal) => (
            <div key={goal.replace(/ /g, '-')}>
              <input
                id={goal.replace(/ /g, '-')}
                type='radio'
                name='mainGoal'
                value={goal}
                defaultChecked={defaultGoal === goal}
              />
              <label htmlFor={goal.replace(/ /g, '-')}>{goal}</label>
            </div>
          ))}
        </div>

        <div>
          <button formAction={handleBack}>Back</button>
          <button type='submit'>Continue</button>
        </div>
      </form>
    </main>
  )
}

export default FormProjectDetails
