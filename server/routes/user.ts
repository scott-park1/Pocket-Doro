import express from 'express'
import * as db from '../db/db'
import { UserData } from '../../models/user'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const user = await db.getUser()
    res.json({ user })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Something went wrong with fetching the movie list' })
  }
})

router.post('/', async (req, res) => {
  try {
    const newTask = req.body as UserData
    if (!newTask) {
      res.sendStatus(400)
      return
    }

    const task = await db.addTask(newTask)
    res.json({ task })
  } catch (error) {
    res.sendStatus(500)
  }
})

export default router
