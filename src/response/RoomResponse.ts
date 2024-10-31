

interface Room {
  id: number
  name: String
  description: String
  feature: String
  published: number
  availability: number
  images: string
}
interface RoomCreate {
  name: String
  description: String
  feature: String
  published: number
  availability: number
  images: File[]
}
interface RoomUpdate {
  name: String
  description: String
  feature: String
  published: number
  availability: number
  images: File[]
  _method: 'PUT'
}
