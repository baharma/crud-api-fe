'use client'
import { http } from '../config'

const getRoomList = async () => {
  try {
    const res = await http().get('/api/v1/room')
    return res.data
  } catch (err) {
    console.log(err)
    throw err
  }
}

const createRoom = async (roomCreate: RoomCreate) => {
  try {
    const res = await http().post('/api/v1/room', roomCreate)
    return res.data
  } catch (err) {
    console.log(err)
    throw err
  }
}

const updateRoom = async (
  id: number,
  roomUpdate: RoomUpdate,
): Promise<RoomCreate> => {
  try {
    const res = await http().post(`/api/v1/room/${id}`, roomUpdate)
    return res.data
  } catch (err) {
    console.log(err)
    throw err
  }
}
const deleteRoom = async (id: number): Promise<void> => {
  try {
    const res = await http().delete(`/api/v1/room/${id}`)
    return res.data
  } catch (err) {
    console.log(err)
    throw err
  }
}

const findIdRoom = async (id: number) => {
  try {
    const res = await http().get(`api/v1/room/${id}`)
    return res.data
  } catch (err) {
    console.log(err)
    throw err
  }
}

export { getRoomList, createRoom, updateRoom, deleteRoom, findIdRoom }
