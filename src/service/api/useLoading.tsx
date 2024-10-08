'use client'
import { useState } from 'react'

const useLoading = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const on = (): void => {
    setLoading(true)
  }

  const off = (): void => {
    setTimeout(() => setLoading(false), 500)
  }

  return { loading, on, off }
}

export default useLoading
