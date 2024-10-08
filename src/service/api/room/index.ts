'use client'
import { useEffect, useState } from 'react'

import { getRoomList } from './room.api'
import useLoading from '../useLoading'

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

const useRoomApi = (autoLoad: boolean = false) => {
  const { loading, on, off } = useLoading()
  const [roomItems, setRoomItems] = useState<Room[]>([])
  const [error, setError] = useState<string | null>(null)

  const onGetRooms = async () => {
    try {
    const data = await getRoomList();
    console.log(data)
        setRoomItems(data)
    } catch (err) {
      console.error(`Error fetching products: ${err}`)
      alert(`Terjadi Kesalahan pada sistem: ${err}`)
    } 
  }

  useEffect(() => {
    if (autoLoad) {
      onGetRooms()
    }
  }, [autoLoad])

  return  {
    loading,
    roomItems,
    error,
    onGetRooms,

  }
}

export default useRoomApi

