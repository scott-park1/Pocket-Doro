import express from 'express'
import * as db from '../db/images'

const router = express.Router()

// GET /api/v1/images
router.get('/', async (req, res) => {
  try {
    const allImages = await db.getAllImages()
    res.json(allImages)
  } catch (error) {
    res.status(500).json({ error: 'There was an error finding your image...' })
  }
})

export default router
