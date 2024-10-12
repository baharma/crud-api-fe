interface Calendar {
  id: number
  room: string
  name: string
  slug: string
  detail: string
  price: number
}

interface CalendarCreate {
  room: string
  name: string
  detail: string
  price: number
}

interface CalendarUpdate {
  room: string
  name: string
  detail: string
  price: number
  _method: 'PUT'
}
