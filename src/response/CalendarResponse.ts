interface Calendar {
  id: number
  room: string
  name: string
  slug: string
  detail: string
  price: number
}

interface CalendarCreate {
  room_id: number
  rateplan_id: number
  date: string
  availability: number
}

interface CalendarUpdate {
  room_id: number
  rateplan_id: number
  date: string
  availability: number
  _method: 'PUT'
}
