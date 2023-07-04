import express from 'express'
import * as db from '../db/db'
import { UserData } from '../../models/user'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const user = await db.getUser()
    res.json({ user })
  } catch (error) {
    console.log(error)
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
    console.log(error)
    res.sendStatus(500)
  }
})

router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  if (isNaN(id)) {
    res.status(400).send('Bad Request: ID must be a number')
    return
  }

  try {
    await db.deleteTask(id)
    res.sendStatus(200)
  } catch (err) {
    console.log(err)
    res.status(500).send('Could not delete pokemon')
  }
})

export default router
