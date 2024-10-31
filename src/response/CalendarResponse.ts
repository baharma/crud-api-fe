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

interface CalendarDetail {
  id: number
  room_id?: number
  rateplan_id?: number
  date?: string
  availability?: number
  created_at?: string
  updated_at?: string
}

interface CalendarUpdate {
  room_id: number
  rateplan_id: number
  date: string
  availability: number
}
