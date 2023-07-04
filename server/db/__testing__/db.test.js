// @vitest-environment node
import { afterAll, beforeAll, beforeEach, describe, it, expect } from 'vitest'

import * as db from '../db'
import connection from '../connection'

beforeAll(() => {
  return connection.migrate.latest()
})

beforeEach(async () => {
  await connection.seed.run()
})

afterAll(async () => {
  await connection.destroy()
})

describe('getUser', () => {
  it('should return a list of tasks done by user', async () => {
    const userTasks = await db.getUser()
    expect(userTasks).toHaveLength(3)
    expect(userTasks).toMatchInlineSnapshot(`
      [
        {
          "id": 1,
          "task": "learn how to code",
        },
        {
          "id": 2,
          "task": "learn how to deploy",
        },
        {
          "id": 3,
          "task": "practice typescript",
        },
      ]
    `)
  })
})

describe('addTask', () => {
  it('should add a task to the database', async () => {
    const EXPECTED_ID = 4
    const EXPECTED_LENGTH = 4
    // const userTaskToAdd = {
    //   task: 'play the guitar',
    // }

    const ids = await db.addTask('play the guitar')
    const newId = ids[0]
    console.log(`newId`, newId) // undefined

    const userTasks = await db.getUser()
    expect(userTasks).toHaveLength(EXPECTED_LENGTH)

    expect(newId).toBe(EXPECTED_ID)
  })
})
