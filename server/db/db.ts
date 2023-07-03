import db from './connection'
import { User, UserData } from '../../models/user'

export async function getUser(): Promise<User[]> {
  const users = await db('user').select('*')
  return users
}

export async function addTask(newTask: UserData): Promise<UserData> {
  const [task] = await db('user').insert(newTask).returning('*')
  return task
}

export async function deleteTask(id: number): Promise<void> {
  await db('user').where({ id }).delete()
}
