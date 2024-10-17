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

  // Tambahkan handler untuk select (misalnya untuk room_id)
  const handleSelect = (fieldName: keyof T, value: any) => {
    setForm({
      ...form,
      [fieldName]: value, // Update field yang sesuai dengan pilihan select
    })
  }

  const resetForm = () => {
    setForm(initialValues)
  }

  return {
    form,
    handleChange,
    handleSelect, // Kembalikan handleSelect untuk mengatur field dari Select
    resetForm,
  }
}
