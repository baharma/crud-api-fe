'use client'
import { useEffect, useState } from 'react'

import {
  createRoom,
  deleteRoom,
  findIdRoom,
  getRoomList,
  updateRoom,
} from './room.api'
import useLoading from '../useLoading'

const useRoomApi = (autoLoad: boolean = false) => {
  const { loading, on, off } = useLoading()
  const [roomItems, setRoomItems] = useState<Room[]>([])
  const [error, setError] = useState<string | null>(null)

  const onGetRooms = async () => {
    try {
      const data = await getRoomList()
      setRoomItems(data.data)
      setError(null)
      return data
    } catch (err) {
      console.error(`Error fetching products: ${err}`)
      setError(`Failed to fetching media: ${err}`)
    } finally {
      off()
    }
  }

  const onCreateRoom = async (roomCreate: RoomCreate) => {
    on()
    try {
      const data = await createRoom(roomCreate)
      setError(null)
      setRoomItems(data)
    } catch (err) {
      console.error(`Error creating room: ${err}`)
      setError(`Failed to create room: ${err}`)
    } finally {
      off()
    }
  }

  const onUpdateRoom = async (room: RoomUpdate, id: number) => {
    on()
    try {
      const data = await updateRoom(id, room)
      setError(null)
      setRoomItems((prev) =>
        prev.map((item) => (item.id === id ? (data as Room) : item)),
      )
    } catch (err) {
      console.error(`Error updating room: ${err}`)
      setError(`Failed to update room: ${err}`)
    } finally {
      off()
    }
  }

  const onDeleteRoom = async (id: number) => {
    on()
    try {
      await deleteRoom(id)
      setError(null)
      setRoomItems((prev) => prev.filter((item) => item.id !== id))
    } catch (err) {
      console.error(`Error deleting room: ${err}`)
      setError(`Failed to delete room: ${err}`)
    } finally {
      off()
    }
  }
  const onFindIdRoom = async (id: number) => {
    on()
    try {
      const res = await findIdRoom(id)
      setError(null)
      setRoomItems(res)
    } catch (err) {
      console.error(`Error fetching room: ${err}`)
      setError(`Failed to fetch room: ${err}`)
    } finally {
      off()
    }
  }

  useEffect(() => {
    if (autoLoad) {
      onGetRooms()
    }
  }, [autoLoad])

  return {
    loading,
    roomItems,
    error,
    onGetRooms,
    onCreateRoom,
    onUpdateRoom,
    onDeleteRoom,
    onFindIdRoom,
  }
}

export default useRoomApi
