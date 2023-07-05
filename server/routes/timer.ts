import express from 'express'
import { TimePreference } from '../../models/timer'
import { JwtRequest } from '../utils/auth'

import * as db from '../db/db'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const timeSettings = await db.getTimePreferences()

    res.json({ timeSettings })
  } catch (error) {
    res.status(500).send('Something went wrong!')
  }
})

router.put('/:id', async (req: JwtRequest, res) => {
  const { timerSettings } = req.body as { timerSettings: TimePreference }

  const id = Number(req.params.id)

  if (!timerSettings || !id) {
    console.error('Bad Request - no timer settings or id')
    return res.status(400).send('Bad request')
  }

  try {
    const updatedPreferences = await db.updateTimePreferences(id, timerSettings)

    res.status(200).json({ timerSettings: updatedPreferences })
  } catch (error) {
    if (error instanceof Error) {
      console.error(error)
    }
    res.status(500).send('Something went wrong!')
  }
})

export default router
