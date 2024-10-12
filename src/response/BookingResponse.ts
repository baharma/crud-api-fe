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
