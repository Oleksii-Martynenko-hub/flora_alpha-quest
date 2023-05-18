import { AnyAction } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'

import {
  ICreateProject,
  LOCAL_DATA,
  createProjectAsync,
  prevStep,
  selectAPIStatus,
  selectCreateProjectData,
  setCreateProjectData,
} from '@/store/formSlice'

import { useTextInput } from '@/components/hooks/useInput'
import { useNumberInput } from '@/components/hooks/useNumberInput'
import { useLocalStorage } from '@/components/hooks/useLocalStorage'

const launchTypes = {
  pre: 'Pre Product',
  post: 'Post Product',
}

function FormCreateProject() {
  const router = useRouter()
  const dispatch = useDispatch()

  const { isLoading, isRejected, error } = useSelector(selectAPIStatus)

  const createProject = useSelector(selectCreateProjectData) as ICreateProject
  const [, setLocalCurrentStep] = useLocalStorage(LOCAL_DATA.CURRENT_STEP)
  const [, setLocalStartFirstProject] = useLocalStorage(LOCAL_DATA.START_FIRST_PROJECT)
  const [, setLocalProjectDetails] = useLocalStorage(LOCAL_DATA.PROJECT_DETAILS)
  const [, setLocalCreateProject] = useLocalStorage(LOCAL_DATA.CREATE_PROJECT)

  const [workersAmount, setWorkersAmount, { increment, decrement }] = useNumberInput(
    createProject.workersAmount,
  )
  const [launchType, setLaunchType] = useTextInput(createProject.launchType)
  const [email, setEmail] = useTextInput(createProject.email)

  const setData = () => {
    const data = { workersAmount: +workersAmount, launchType, email }
    setLocalCreateProject(data)
    dispatch(setCreateProjectData(data))
  }

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!workersAmount || !launchType || !email) {
      alert('Please fill all fields')
      return
    }

    setData()

    try {
      await dispatch(
        createProjectAsync({
          workersAmount: +workersAmount,
          launchType,
          email,
        }) as unknown as AnyAction,
      )
    } catch (error) {
      console.log(error)
    } finally {
      setLocalCurrentStep(undefined)
      setLocalStartFirstProject(undefined)
      setLocalProjectDetails(undefined)
      setLocalCreateProject(undefined)
      router.push('/projects')
    }
  }

  const prevStepHandler = () => {
    setData()
    dispatch(prevStep())
  }

  if (isRejected && error) {
    alert(error)
  }

  return (
    <form onSubmit={onSubmitHandler}>
      <div>
        <label htmlFor='workersAmount'>How many full-time workers on project?</label>
        <div>
          <button onClick={decrement}>-</button>
          <input
            id='workersAmount'
            type='text'
            name='workersAmount'
            placeholder='Workers quantity'
            value={workersAmount}
            onChange={setWorkersAmount}
          />

          <button onClick={increment}>+</button>
        </div>
      </div>

      <div>
        <label htmlFor='launchType'>Are you pre or post product launch?</label>
        <div>
          <input
            id={launchTypes.pre.replace(' ', '-')}
            type='radio'
            name='launchType'
            value={launchTypes.pre}
            checked={launchType === launchTypes.pre}
            onChange={setLaunchType}
          />
          <label htmlFor={launchTypes.pre.replace(' ', '-')}>{launchTypes.pre}</label>
        </div>

        <div>
          <input
            id={launchTypes.post.replace(' ', '-')}
            type='radio'
            name='launchType'
            value={launchTypes.post}
            checked={launchType === launchTypes.post}
            onChange={setLaunchType}
          />
          <label htmlFor={launchTypes.post.replace(' ', '-')}>{launchTypes.post}</label>
        </div>
      </div>

      <div>
        <label htmlFor='email'>Contact Email</label>
        <input
          id='email'
          type='text'
          name='email'
          placeholder='Project Email'
          value={email}
          onChange={setEmail}
        />
      </div>

      <div>
        <button onClick={prevStepHandler}>Back</button>
        <button type='submit'>{isLoading ? 'Loading...' : 'Create Project'}</button>
      </div>
    </form>
  )
}

export default FormCreateProject
