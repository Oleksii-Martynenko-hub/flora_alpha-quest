import Link from 'next/link'
// import fetch from 'node-fetch'

import { IProject } from '@/store/formSlice'

async function getProjects() {
  try {
    // const response = await fetch('https://dummyjson.com/posts?limit=3')
    const response = await fetch('/api/projects')
    const responseClone = response.clone()
    const dataText = await responseClone.text()
    console.log('🚀 ~ getProjects ~ dataText:', dataText)
    // return response.json() as Promise<{
    //   posts: {
    //     id: number
    //     title: string
    //   }[]
    // }>
    return response.json() as Promise<{ projects: IProject[] }>
  } catch (error) {
    console.log('error:', error)
    return { projects: [] }
    // return { posts: [] }
  }
}

export default async function Page() {
  const { projects } = await getProjects()
  console.log('🚀 ~ Page ~ projects:', projects)

  return (
    <>
      <section>
        <div>
          <Link href={'/'}>New project</Link>
        </div>

        <ul style={{ margin: '20px 0 0 0' }}>
          {/* {projects.map(({ id, title }) => (
            <>
              <li key={id} style={{ margin: '0 0 0 20px' }}>
                <h3>{title}</h3>
              </li>
              <hr style={{ margin: '20px 0 0 0' }} />
            </>
          ))} */}
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
