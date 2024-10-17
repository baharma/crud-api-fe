import { useEffect, useState } from 'react'
import useLoading from '../useLoading'
import {
  getCalendarList,
  createCalendarList,
  updateCalendar,
  deleteCalendar,
} from './calendar.api'

const useCalendarApi = (autoLoad: boolean = false) => {
  const { loading, on, off } = useLoading()
  const [calendar, setCalendar] = useState<Calendar[]>([])
  const [error, setError] = useState<string | null>(null)

  const onGetCalendarList = async (): Promise<Calendar[]> => {
    try {
      on() // Aktifkan loading indicator
      const data = await getCalendarList() // Panggil API
      setCalendar(data.data) // Set data ke state jika diperlukan
      setError(null) // Set error ke null jika berhasil
      return data.data // Kembalikan data dari API
    } catch (err) {
      console.error(`Error fetching calendar: ${err}`)
      setError(`Failed to fetch calendar: ${err}`)
      return [] // Kembalikan array kosong jika terjadi error
    } finally {
      off() // Matikan loading indicator
    }
  }

  const onCreateCalendar = async (createCalendar: CalendarCreate) => {
    on()
    try {
      const data = await createCalendarList(createCalendar)
      setCalendar(data)
      setError(error)
    } catch (err) {
      console.error(`Error creating calendar: ${err}`)
      setError(`Failed to create calendar: ${err}`)
    } finally {
      off()
    }
  }

  const onUpdateCalendar = async (
    calendarUpdate: CalendarUpdate,
    id: number,
  ) => {
    on()
    try {
      const data = await updateCalendar(id, calendarUpdate)
      setCalendar(data)
      setError(error)
    } catch (err) {
      console.error(`Error updating calendar: ${err}`)
      setError(`Failed to update calendar: ${err}`)
    } finally {
      off()
    }
  }

  const onDeleteCelender = async (id: number) => {
    on()
    try {
      const data = await deleteCalendar(id)
      setCalendar(calendar.filter((item) => item.id !== id))
      setError(error)
    } catch (err) {
      console.error(`Error deleting calendar: ${err}`)
      setError(`Failed to delete calendar: ${err}`)
    } finally {
      off()
    }
  }

  useEffect(() => {
    if (autoLoad) {
      onGetCalendarList()
    }
  }, [autoLoad])

  return {
    loading,
    calendar,
    error,
    onGetCalendarList,
    onCreateCalendar,
    onUpdateCalendar,
    onDeleteCelender,
  }
}

export default useCalendarApi
