interface RatePlant{
    id: number,
    room: string,
    name: string,
    slug: string,
    detail: string,
    price: number
}

interface RatePlantCreate{
    room: string,
    name: string,
    detail: string,
    price: number
}

interface RatePlantUpdate{
    room: string,
    name: string,
    detail: string,
    price: number
    _method: 'PUT'
}