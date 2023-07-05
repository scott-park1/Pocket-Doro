// @vitest-environment node
import { afterAll, beforeAll, beforeEach, describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'

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
    const userTaskToAdd = {
      task: 'play the guitar',
    }

    const newTask = await db.addTask(userTaskToAdd)

    console.log(`newTask`, newTask) // undefined

    const userTasks = await db.getUser()
    expect(userTasks).toHaveLength(EXPECTED_LENGTH)

    expect(newTask.id).toBe(EXPECTED_ID)
  })
})

describe('getTimePreferences', () => {
  it('should render all time preferences', async () => {
    const preferences = await db.getTimePreferences()

    console.log(preferences)
    // expect(preferences).toHaveLength(1)
    expect(preferences.id).toBe(1)
  })
})
