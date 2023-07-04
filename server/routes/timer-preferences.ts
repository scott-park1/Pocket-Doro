import express from 'express'
import { UpdateTimePreference } from '../../models/timer-preferences'
import { checkJwt, JwtRequest } from '../utils/auth'

import * as db from '../db/db'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const timeSettings = await db.getTimePreferences()

    res.json({ timeSettings })
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong!')
  }
})

router.put('/:id', checkJwt, async (req: JwtRequest, res) => {
  const { timerSettings } = req.body as { timerSettings: UpdateTimePreference }

  const auth0Id = req.auth?.sub

  const id = Number(req.params.id)

  if (!timerSettings || !id) {
    console.error('Bad Request - no timer settings or id')
    return res.status(400).send('Bad request')
  }

  if (!auth0Id) {
    console.error('No auth0Id')
    return res.status(401).send('Unauthorized')
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
