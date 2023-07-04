import request from 'superagent'
import { User, UserData } from '../../models/user'

const userURL = '/api/v1/task'

export async function getUser(): Promise<User[]> {
  const response = await request.get(userURL)
  return response.body.user
}

export async function addTask(newTask: UserData): Promise<UserData> {
  const response = await request.post(userURL).send(newTask)
  return response.body.user
}
