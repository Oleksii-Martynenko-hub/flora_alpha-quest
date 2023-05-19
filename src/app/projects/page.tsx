import Link from 'next/link'
// import fetch from 'node-fetch'

import { IProject } from '@/store/formSlice'

async function getProjects() {
  try {
    const response = await fetch(process.env.API_URL + '/projects')
    const responseClone = response.clone()
    const dataText = await responseClone.text()
    console.log('🚀 ~ getProjects ~ dataText:', dataText)
    return response.json() as Promise<{ projects: IProject[] }>
    // return response.text() as Promise<string>
  } catch (error) {
    console.log('error:', error)
    return { projects: [] }
  }
  
}

export default async function Page() {
  const { projects } = await getProjects()
  // const data = await getProjects()
  // const { projects } = JSON.parse(data) as { projects: IProject[] }
  console.log('🚀 ~ Page ~ projects:', projects)

  return (
    <>
      <section>
        <div>
          <Link href={'/'}>New project</Link>
        </div>

        <ul style={{ margin: '20px 0 0 0' }}>
          {projects.map(
            ({ id, name, url, category, mainGoal, workersAmount, launchType, email }) => (
              <>
                <li key={id} style={{ margin: '0 0 0 20px' }}>
                  <h3>{name}</h3>
                  <p>{url}</p>
                  <p>{category.join(', ')}</p>
                  <p>{mainGoal}</p>
                  <p>{workersAmount}</p>
                  <p>{launchType}</p>
                  <p>{email}</p>
                </li>
                <hr style={{ margin: '20px 0 0 0' }} />
              </>
            ),
          )}
        </ul>
      </section>
    </>
  )
}
