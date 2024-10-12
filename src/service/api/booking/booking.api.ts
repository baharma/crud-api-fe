import { http } from '../config'

const getBookingList = async () => {
  try {
    const res = await http().get('/api/v1/booking')
    return res.data
  } catch (err) {
    console.log(err)
    throw err
  }
}

const createBooking = async (bookingCreate: BookingCreate) => {
  try {
    const res = await http().post('/api/v1/booking', bookingCreate)
    return res.data
  } catch (err) {
    console.log(err)
    throw err
  }
}

const updateBooking = async (bookingUpdate: BookingUpdate, id: number) => {
  try {
    const res = await http().post(`/api/v1/booking/${id}`, bookingUpdate)
    return res.data
  } catch (err) {
    console.log(err)
    throw err
  }
}

const deleteBooking = async (id: number) => {
  try {
    const res = await http().delete(`/api/v1/booking/${id}`)
    return res.data
  } catch (err) {
    console.log(err)
    throw err
  }
}

export { getBookingList, createBooking, updateBooking, deleteBooking }
