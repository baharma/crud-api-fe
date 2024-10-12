import { http } from '../config'

const getRatePlanList = async () => {
  try {
    const res = await http().get('/api/v1/rate-plant')
    return res.data
  } catch (err) {
    console.log(err)
    throw err
  }
}

const creataRatePlant = async (ratePlantCreate: RatePlantCreate) => {
  try {
    const res = await http().post('/api/v1/rate-plant', ratePlantCreate)
    return res.data
  } catch (err) {
    console.log(err)
    throw err
  }
}

const updateRatePlant = async (
  ratePlantCreate: RatePlantCreate,
  id: number,
) => {
  try {
    const res = await http().post(`/api/v1/rate-plant/${id}`, ratePlantCreate)
    return res.data
  } catch (err) {
    console.log(err)
    throw err
  }
}

const deleteRatePlant = async (id: number) => {
  try {
    const res = await http().delete(`/api/v1/rate-plant/${id}`)
    return res.data
  } catch (err) {
    console.log(err)
    throw err
  }
}

export { getRatePlanList, creataRatePlant, updateRatePlant, deleteRatePlant }
