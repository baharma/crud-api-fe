interface Room {
  id: number
  name: String
  description: String
  feature: String
  published: number
  availability: number
  images: String
}
interface RoomCreate {
  name: String
  description: String
  feature: String
  published: number
  availability: number
  images: String
}
interface RoomUpdate {
  name: String
  description: String
  feature: String
  published: number
  availability: number
  images: String
  _method: 'PUT'
}
