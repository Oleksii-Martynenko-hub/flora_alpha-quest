import fs from 'fs'
import path from 'path'

export default class JsonFile {
  private filePath: string

  constructor(filePath: string) {
    this.filePath = filePath
  }

  public read(): any {
    if (!fs.existsSync(path.dirname(this.filePath))) {
      fs.mkdirSync(path.dirname(this.filePath), { recursive: true })
      fs.writeFileSync(this.filePath, '[]')
    }
    const file = fs.readFileSync(this.filePath, 'utf-8')
    return JSON.parse(file)
  }

  public write(data: any): void {
    const file = JSON.stringify(data)
    fs.writeFileSync(this.filePath, file)
  }
}

export class ProjectsController<T> {
  private filePath: string
  private database: JsonFile

  constructor(filename: string) {
    this.filePath = path.join(__dirname, '../../../../', 'database', `${filename}.json`)
    this.database = new JsonFile(this.filePath)
  }

  public getAllProjects(): T[] {
    return this.database.read()
  }

  public add(project: T): void {
    const data = this.database.read()
    data.push(project)
    this.database.write(data)
  }

  public remove(id: number): void {
    const data = this.database.read()
    const newData = data.filter((project: any) => project.id !== id)
    this.database.write(newData)
  }
}
