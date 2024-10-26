'use client'
import { Button, Form, Modal, Table } from 'antd'
import Layout from '../../layout/index'
import useRoomApi from '@/service/api/room'
import { useModal } from '@/service/ui/useModal'
import { useEffect, useMemo, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Columns } from './TableData'
import { useForm } from '@/service/hooks/useForm'

const Room = () => {
  const [roomData, setRoomData] = useState<Room[]>([])
  const [idRoomData, setIdRoomData] = useState<number | null>(null)
  const {
    loading,
    onGetRooms,
    onCreateRoom,
    onDeleteRoom,
    onFindIdRoom,
    onUpdateRoom,
  } = useRoomApi()
  const [form] = Form.useForm()
  const { confirmLoading, open, handleCancel, handleOk, showModal } = useModal()

  const refreshDataTable = async () => {
    await onGetRooms().then((value) => {
      setRoomData(value)
    })
  }

  const dataRoomMemo = useMemo(() => {
    return roomData
  }, [roomData])

  useEffect(() => {
    refreshDataTable()
  }, [])

  const editRoom = async (id: number) => {}

  const deleteRoom = async (id: number) => {}

  return (
    <Layout>
      <div className="flex">
        <Button type="primary">
          Add New Room
          <PlusOutlined />
        </Button>
      </div>

      <Table<Room>
        columns={Columns(editRoom, deleteRoom)}
        loading={loading}
        rowKey="id"
        dataSource={dataRoomMemo}
        pagination={{ pageSize: 10 }}
      />
      <Modal
        title="Room Form"
        open={open}
        confirmLoading={confirmLoading}
        footer={null}
        onCancel={handleCancel}
      >
        <Form></Form>
      </Modal>
    </Layout>
  )
}

export default Room
