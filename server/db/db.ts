import db from './connection'
import { User, UserData } from '../../models/user'

export async function getUser(): Promise<User[]> {
  const users = await db('user').select('*')
  return users
}

export async function addTask(newTask: UserData): Promise<UserData> {
  const [task] = await db('user').insert({ task: newTask.task }).returning('*')
  return task
}
