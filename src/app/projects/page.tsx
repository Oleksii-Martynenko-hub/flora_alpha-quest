import axios from 'axios'
import Link from 'next/link'

import { IProject } from '@/store/formSlice'

async function getProjects() {
  return axios.get<IProject[]>(process.env.API_URL + '/projects')
}

export default async function Page() {
  const { data: projects } = await getProjects()

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
