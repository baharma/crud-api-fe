import { useEffect, useState } from 'react'
import useLoading from '../useLoading'
import {
  creataRatePlant,
  deleteRatePlant,
  getRatePlanList,
  updateRatePlant,
} from './ratePlan.api'

const useRatePlantApi = (autoLoad: boolean = false) => {
  const { loading, on, off } = useLoading()
  const [ratePlantItems, setRatePlantItems] = useState<RatePlant[]>([])
  const [error, setError] = useState<string | null>(null)

  const onGetListRatePlants = async () => {
    try {
      const ratePlant = await getRatePlanList()
      setError(null)
      setRatePlantItems(ratePlant)
    } catch (err) {
      console.log(err)
      throw err
    } finally {
      off()
    }
  }

  const onCreateRatePlantItems = async (ratePlantCreate: RatePlantCreate) => {
    try {
      const ratePlant = await creataRatePlant(ratePlantCreate)
      setError(null)
      setRatePlantItems((prev) => [...prev, ratePlant])
    } catch (err) {
      console.error(`Error creating ratePlant: ${err}`)
      setError(`Failed to create ratePlant: ${err}`)
    } finally {
      off()
    }
  }

  const onUpdateRatePlantItem = async (
    ratePlantUpdate: RatePlantUpdate,
    id: number,
  ) => {
    on()
    try {
      const ratePlant = await updateRatePlant(ratePlantUpdate, id)
      setError(null)
      setRatePlantItems(ratePlant)
    } catch (err) {
      console.error(`Error updating ratePlant: ${err}`)
      setError(`Failed to update ratePlant: ${err}`)
    } finally {
      off()
    }
  }

  const onDeletePlantItem = async (id: number) => {
    on()
    try {
      const ratePlant = await deleteRatePlant(id)
      setError(null)
      setRatePlantItems(ratePlant)
    } catch (err) {
      console.error(`Error updating ratePlant: ${err}`)
      setError(`Failed to update ratePlant: ${err}`)
    } finally {
    }
  }

  useEffect(() => {
    if (autoLoad) {
      onGetListRatePlants()
    }
  }, [autoLoad])

  return {
    loading,
    error,
    ratePlantItems,
    onCreateRatePlantItems,
    onGetListRatePlants,
    onUpdateRatePlantItem,
    onDeletePlantItem,
  }
}

export default useRatePlantApi
