import request from 'superagent'

import { TimePreference, UpdateTimePreference } from '../../models/timer'

const rootUrl = '/api/v1/timer'

export async function getTimerSettings(): Promise<TimePreference> {
  return await request
    .get(`${rootUrl}`)
    .then((res) => {
      console.log(res.body)
      return res.body.timeSettings
    })
    .catch(logError)
}

interface UpdateTimerFunction {
  timerSettings: UpdateTimePreference
  token: string
}
export async function updateTimerSettings({
  timerSettings,
  token,
}: UpdateTimerFunction) {
  return await request
    .put(`${rootUrl}`)
    .set(`Authorization`, `Bearer ${token}`)
    .send({ timerSettings })
    .then((res) => res.body.timerSettings)
    .catch(logError)
}

function logError(err: Error) {
  console.log(err)
  if (err.message === 'Username Taken') {
    throw new Error('Username already taken - please choose another')
  } else if (err.message === 'Forbidden') {
    throw new Error(
      'Only users who are logged in can set the timer preferences'
    )
  } else {
    console.error('Error consuming the API (in client/api.js):', err.message)
    throw err
  }
}
