import { Image } from '../../models/images'
import db from './connection'

export async function getAllImages(): Promise<Image[]> {
  const images = await db('images').select('*')
  return images
}
