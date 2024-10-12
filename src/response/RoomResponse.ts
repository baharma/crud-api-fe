interface Room {
  id: number
  name: String
  description: String
  feature: String
  published: String
  availability: String
  images: String
}
interface RoomCreate {
  name: String
  description: String
  feature: String
  published: String
  availability: String
  images: String
}
interface RoomUpdate {
  name: String
  description: String
  feature: String
  published: String
  availability: String
  images: String
  _method: 'PUT'
}
