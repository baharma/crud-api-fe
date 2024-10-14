import { useState } from 'react'

export const useModal = () => {
  const [open, setOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)

  const showModal = () => {
    setOpen(true)
  }

  const handleOk = () => {
    setConfirmLoading(true)
    setTimeout(() => {
      setOpen(false)
      setConfirmLoading(false)
    }, 2000)
  }

  const handleCancel = () => {
    setOpen(false)
  }

  return {
    open,
    confirmLoading,
    showModal,
    handleOk,
    handleCancel,
  }
}
