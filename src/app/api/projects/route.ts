import { NextRequest, NextResponse } from 'next/server'

import { IProject } from '@/store/formSlice'

import { ProjectsController } from '@/utils/localDB'

const filename = 'projects'

export async function GET(req: NextRequest) {
  const projects = new ProjectsController<IProject>(filename)

  const projectsData = projects.getAllProjects()
  return NextResponse.json({ projects: projectsData })
}

export async function POST(req: NextRequest) {
  const data = await req.json()
  const projects = new ProjectsController<IProject>(filename)

  projects.add(data)

  return NextResponse.json({ data })
}
