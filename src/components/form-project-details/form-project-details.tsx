import { useDispatch, useSelector } from 'react-redux'

import {
  IProjectDetails,
  LOCAL_DATA,
  nextStep,
  prevStep,
  selectProjectDetailsData,
  setProjectDetailsData,
} from '@/store/formSlice'

import { useTextInput } from '@/components/hooks/useInput'
import { useLocalStorage } from '@/components/hooks/useLocalStorage'

const goals = ['Grow My Community', 'Activate Existing Members', 'Understand My Members', 'Other']

function FormProjectDetails() {
  const dispatch = useDispatch()

  const projectDetails = useSelector(selectProjectDetailsData) as IProjectDetails
  const [_, setLocalProjectDetails] = useLocalStorage(LOCAL_DATA.PROJECT_DETAILS)

  const [chosenGoal, setChosenGoal] = useTextInput(projectDetails?.mainGoal)

  const nextStepHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!chosenGoal) {
      alert('Please choose a goal')
      return
    }

    setLocalProjectDetails({ mainGoal: chosenGoal })
    dispatch(setProjectDetailsData({ mainGoal: chosenGoal }))
    dispatch(nextStep())
  }

  const prevStepHandler = () => {
    setLocalProjectDetails({ mainGoal: chosenGoal })
    dispatch(setProjectDetailsData({ mainGoal: chosenGoal }))
    dispatch(prevStep())
  }

  return (
    <form onSubmit={nextStepHandler}>
      <div>
        <label htmlFor='mainGoal'>
          What is your main goal with AlphaQuest <span>?</span>
        </label>

        {goals.map((goal) => (
          <div key={goal.replace(/ /g, '-')}>
            <input
              id={goal.replace(/ /g, '-')}
              type='radio'
              name='mainGoal'
              value={goal}
              checked={chosenGoal === goal}
              onChange={setChosenGoal}
            />
            <label htmlFor={goal.replace(/ /g, '-')}>{goal}</label>
          </div>
        ))}
      </div>

      <div>
        <button onClick={prevStepHandler}>Back</button>
        <button type='submit'>Continue</button>
      </div>
    </form>
  )
}

export default FormProjectDetails
