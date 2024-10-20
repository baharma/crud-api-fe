interface Booking {
  id: number
  room: string
  rateplan: string
  calendar: string
  reservation_number: number
  reservation_date: number
  check_in: string
  check_out: string
  name: string
  email: string
  phone_number: string
}

interface BookingCreate {
  room_id: number
  rateplan_id: number
  calendar_id: number
  reservation_date: string
  check_in: string
  check_out: string
  name: string
  email: string
  phone_number: number
}

interface BookingUpdate {
  room: string
  rateplan: string
  calendar: string
  reservation_number: number
  reservation_date: number
  check_in: string
  check_out: string
  name: string
  email: string
  phone_number: string
  _method: 'PUT'
}
