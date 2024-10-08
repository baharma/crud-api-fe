'use client'
import { http } from '../config'

interface Room {
  id: number
  name: String
  slug: String
  description: String
  feature: String
  published: String
  availability: String
  images: String
}

const getRoomList = async () => {
  try {
    const res = await http().get('/api/v1/room')
    return res.data
  } catch (err) {
    console.log(err)
    throw err
  }
}

export { getRoomList }
