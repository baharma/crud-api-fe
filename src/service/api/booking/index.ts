import { useEffect, useState } from 'react'
import useLoading from '../useLoading'
import {
  createBooking,
  deleteBooking,
  findIdBooking,
  getBookingList,
  updateBooking,
} from './booking.api'

const useBookingApi = (autoLoad: boolean = false) => {
  const { loading, on, off } = useLoading()
  const [bookingItems, setBookingItems] = useState<Booking[]>([])
  const [error, setError] = useState<string | null>(null)

  const onGetListBooking = async () => {
    try {
      on()
      const data = await getBookingList()
      setBookingItems(data)
      setError(null)
      return data.data
    } catch (err) {
      console.error(`Error fetching booking list: ${err}`)
      setError(`Failed to fetch booking list: ${err}`)
    } finally {
      off()
    }
  }

  const onCreateBooking = async (bookingCreate: BookingCreate) => {
    try {
      on()
      const data = await createBooking(bookingCreate)
      setBookingItems(data)
      setError(null)
    } catch (err) {
      console.error(`Error creating booking: ${err}`)
      setError(`Failed to create booking: ${err}`)
    } finally {
      off()
    }
  }

  const onUpdateBooking = async (bookingUpdate: BookingUpdate, id: number) => {
    try {
      on()
      const data = await updateBooking(bookingUpdate, id)
      setBookingItems(data)
      setError(null)
      return data.data
    } catch (err) {
      console.error(`Error updating booking: ${err}`)
      setError(`Failed to update booking: ${err}`)
    } finally {
      off()
    }
  }

  const onDeleteBooking = async (id: number) => {
    try {
      on()
      const data = await deleteBooking(id)
      setError(null)
    } catch (err) {
      console.error(`Error updating booking: ${err}`)
      setError(`Failed to update booking: ${err}`)
    } finally {
      off()
    }
  }

  const onfindIdBooking = async (id: number) => {
    try {
      on()
      const data = await findIdBooking(id)
      return data.data
    } catch (err) {
      console.error(`Error find booking: ${err}`)
      setError(`Failed to find booking: ${err}`)
    } finally {
      off
    }
  }

  useEffect(() => {
    if (autoLoad) {
      onGetListBooking()
    }
  }, [autoLoad])
  return {
    loading,
    error,
    bookingItems,
    onCreateBooking,
    onUpdateBooking,
    onDeleteBooking,
    onGetListBooking,
    onfindIdBooking,
  }
}

export default useBookingApi
