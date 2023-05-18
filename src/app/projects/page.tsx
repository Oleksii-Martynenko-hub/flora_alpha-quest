import Link from 'next/link'

import { IProject } from '@/store/formSlice'

async function getProjects() {
  const data = await fetch(process.env.API_URL + '/projects')

  // return data.json() as Promise<{ projects: IProject[] }>
  return data
}

export default async function Page() {
  const data = await getProjects()
  console.log('🚀 ~ Page ~ data:', data)
  const projects: IProject[] = []

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
