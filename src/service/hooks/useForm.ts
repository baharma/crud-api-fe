import { useState } from 'react'

// Tambahkan Generic T untuk memperjelas tipe form
export const useForm = <T extends object>(initialValues: T) => {
  const [form, setForm] = useState<T>(initialValues)

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setForm({
      ...form,
      [name]: value,
    })
  }

  const resetForm = () => {
    setForm(initialValues)
  }

  return {
    form,
    handleChange,
    resetForm,
  }
}
