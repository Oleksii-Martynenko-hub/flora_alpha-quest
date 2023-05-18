import { useDispatch, useSelector } from 'react-redux'

import {
  IStartFirstProject,
  LOCAL_DATA,
  nextStep,
  selectStartFirstProjectData,
  setStartFirstProjectData,
} from '@/store/formSlice'

import { useTextInput } from '@/components/hooks/useInput'
import { useLocalStorage } from '@/components/hooks/useLocalStorage'
import { useCheckboxInputGroup } from '@/components/hooks/useCheckboxInputGroup'

import styles from './form-start-first-project.module.scss'

const categoriesList = [
  'NFT',
  'GameFi',
  'DeFi',
  'DAO',
  'Ecosystem',
  'Others',
  'SocialFi',
  'Metaverse',
  'Tools',
]

function FormStartFirstProject() {
  const dispatch = useDispatch()

  const startFirstProject = useSelector(selectStartFirstProjectData) as IStartFirstProject
  const [_, setLocalStartFirstProject] = useLocalStorage(LOCAL_DATA.START_FIRST_PROJECT)

  const [name, setName] = useTextInput(startFirstProject.name)
  const [url, setUrl] = useTextInput(startFirstProject.url)
  const [chosenCategories, setChosenCategories] = useCheckboxInputGroup(startFirstProject.category)

  const nextStepHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!name || !url || !chosenCategories.length) {
      alert('Please fill all fields')
      return
    }

    const data: IStartFirstProject = {
      name,
      url,
      category: chosenCategories,
    }

    setLocalStartFirstProject(data)
    dispatch(setStartFirstProjectData(data))
    dispatch(nextStep())
  }

  return (
    <>
      <h3>Add New Project</h3>

      <form onSubmit={nextStepHandler}>
        <div>
          <label htmlFor='name'>Project Name (It can be changed later)</label>
          <input
            id='name'
            type='text'
            name='name'
            placeholder='Project Name'
            value={name}
            onChange={setName}
          />
        </div>

        <div>
          <label htmlFor='url'>Project URL (It cannot be changed after creation)</label>
          <input
            id='url'
            type='text'
            name='url'
            placeholder='Project URL'
            value={url}
            onChange={setUrl}
          />
        </div>

        <div>
          <label>Project Category (It cannot be changed after creation)</label>
          {categoriesList.map((category) => (
            <div key={category}>
              <input
                id={category}
                type='checkbox'
                name='category'
                value={category}
                checked={chosenCategories.includes(category)}
                onChange={setChosenCategories}
              />
              <label htmlFor={category}>{category}</label>
            </div>
          ))}
        </div>

        <button type='submit'>Add Project</button>
      </form>
    </>
  )
}

export default FormStartFirstProject
