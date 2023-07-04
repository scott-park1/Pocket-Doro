import db from './connection'
import { User, UserData } from '../../models/user'
import { TimePreference, UpdateTimePreference } from '../../models/timer'
import connection from './connection'

export async function getUser(): Promise<User[]> {
  const users = await db('user').select('*')
  return users
}

export async function addTask(newTask: UserData): Promise<User> {
  const [task] = await db('user').insert({ task: newTask.task }).returning('*')
  return task
}

//new user would have to create new user settings

export async function getTimePreferences(): Promise<TimePreference[]> {
  const preferences = await db('timerPreferences').select('*').first() // get at user_id
  return preferences
}

export async function updateTimePreferences(
  id: number,
  updatedTimes: UpdateTimePreference,
  db = connection
): Promise<TimePreference[]> {
  const updatedPreferences = await db('timerPreferences')
    .update(updatedTimes)
    .where({ id })
    .returning('*')

  return updatedPreferences
}
