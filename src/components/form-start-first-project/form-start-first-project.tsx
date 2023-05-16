import { revalidatePath } from 'next/cache'

import { store } from '@/store'
import { IStartFirstProject, nextStep, setStartStepData } from '@/store/formSlice'

function FormStartFirstProject() {
  const categories = [
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

  const defaultName = store.getState().form.formStepsData.startFirstProject.name || ''
  const defaultUrl = store.getState().form.formStepsData.startFirstProject.url || ''
  const defaultCategory = store.getState().form.formStepsData.startFirstProject.category || []

  async function handleSubmit(formData: FormData) {
    'use server'
    const formattedData: IStartFirstProject = {
      name: formData.get('name') as string,
      url: formData.get('url') as string,
      category: [...formData.getAll('category')] as string[],
    }

    store.dispatch(nextStep())
    store.dispatch(setStartStepData(formattedData))
    revalidatePath('/')
  }

  return (
    <main>
      <h2>
        <p>To Create Quest you need firstly create Project</p>
        Add New Project
      </h2>

      <form action={handleSubmit}>
        <div>
          <label htmlFor='name'>Project Name (It can be changed later)</label>
          <input
            id='name'
            type='text'
            name='name'
            defaultValue={defaultName}
            placeholder='Project Name'
          />
        </div>

        <div>
          <label htmlFor='url'>Project URL (It cannot be changed after creation)</label>
          <input
            id='url'
            type='text'
            name='url'
            defaultValue={defaultUrl}
            placeholder='Project URL'
            prefix='Alphaguilty.io/'
          />
        </div>

        <div>
          <label>Project Category (It cannot be changed after creation)</label>
          {categories.map((category) => (
            <div key={category}>
              <input
                id={category}
                type='checkbox'
                name='category'
                value={category}
                defaultChecked={defaultCategory.includes(category)}
              />
              <label htmlFor={category}>{category}</label>
            </div>
          ))}
        </div>

        <button type='submit'>Add Project</button>
      </form>
    </main>
  )
}

export default FormStartFirstProject
