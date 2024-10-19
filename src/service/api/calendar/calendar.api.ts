import { http } from '../config'

const getCalendarList = async () => {
  try {
    const res = await http().get('/api/v1/calendar')
    return res.data
  } catch (err) {
    console.log(err)
    throw err
  }
}

const createCalendarList = async (createCalendar: CalendarCreate) => {
  try {
    const res = await http().post('/api/v1/calendar', createCalendar)
    return res.data
  } catch (err) {
    console.log(err)
    throw err
  }
}

const updateCalendar = async (id: number, updateCalendar: CalendarUpdate) => {
  try {
    const res = await http().post(`/api/v1/calendar/${id}`, updateCalendar)
    return res.data
  } catch (err) {
    console.log(err)
    throw err
  }
}

const deleteCalendar = async (id: number) => {
  try {
    const res = await http().delete(`/api/v1/calendar/${id}`)
    return res.data
  } catch (err) {
    console.log(err)
    throw err
  }
}

const findId = async (id: number) => {
  try {
    const res = await http().get(`/api/v1/calendars/${id}`)
    return res.data
  } catch (err) {
    console.log(err)
    throw err
  }
}

export {
  getCalendarList,
  createCalendarList,
  updateCalendar,
  deleteCalendar,
  findId,
}
