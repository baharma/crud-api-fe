'use client'
import { Button, Form, Modal, Select, Table, Input } from 'antd'
import Layout from '../../layout/index'
import { useEffect, useMemo, useState } from 'react'
import useBookingApi from '@/service/api/booking'
import { Columns } from './TableData'
import { useModal } from '@/service/ui/useModal'
import useRoomApi from '@/service/api/room'
import useCalendarApi from '@/service/api/calendar'
import useRatePlantApi from '@/service/api/ratePlan'

const Booking = () => {
  const [booking, setBooking] = useState<Booking[]>([])
  const [idBooking, setIdBooking] = useState<number | null>(null)
  const [form] = Form.useForm()
  const {
    error,
    loading,
    onGetListBooking,
    onCreateBooking,
    onDeleteBooking,
    onUpdateBooking,
    onfindIdBooking,
  } = useBookingApi()
  const { roomItems } = useRoomApi(true)
  const { calendar } = useCalendarApi(true)
  const { ratePlantItems } = useRatePlantApi(true)

  useEffect(() => {
    refreshData()
  }, [])

  const submitEvent = (e : React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    form.validateFields().then(async (values) => {
      
    })
  }

  const dataRoomList = useMemo(() => {
    return roomItems
  }, [roomItems])

  const dataCalendar = useMemo(() => {
    return calendar
  }, [calendar])

  const dataRatePlantList = useMemo(() => {
    return ratePlantItems
  }, [ratePlantItems])

  const refreshData = async () => {
    const data = await onGetListBooking()
    setBooking(data)
  }
  const { open, confirmLoading, showModal, handleOk, handleCancel } = useModal()

  const bookingData = useMemo(() => {
    return booking
  }, [booking])
  const editBooking = async (id: number) => {
    const dataFind = await onfindIdBooking(id)

    setIdBooking(id)
    showModal()
  }
  const deleteBooking = async (id: number) => {
    await onDeleteBooking(id).then(async () => {
      refreshData()
    })
  }

  const onSubmit = async (values: BookingCreate) => {
    if (idBooking) {
    } else {
    }
  }

  return (
    <Layout>
      <Button type="primary" className="mb-2" onClick={showModal}>
        Booking New
      </Button>
      <Table<Booking>
        columns={Columns(editBooking, deleteBooking)}
        dataSource={bookingData}
        loading={loading}
        rowKey={'id'}
        pagination={{ pageSize: 10 }}
      />
      <Modal
        title="Booking"
        open={open}
        confirmLoading={confirmLoading}
        footer={null}
        onCancel={handleCancel}
      >
        <Form onFinish={onSubmit} layout="vertical" form={form}>
          <div className="flex flex-col">
            <Form.Item
              name={'room_id'}
              label="Room"
              rules={[{ required: true, message: 'Please enter room name' }]}
            >
              <Select
                showSearch
                placeholder="Select a room"
                optionFilterProp="label"
                value={form.getFieldValue('room_id')}
                filterOption={(input, option) => {
                  const label = option?.label
                  if (typeof label === 'string') {
                    return label.toLowerCase().includes(input.toLowerCase())
                  }
                  return false
                }}
                className="w-full"
              >
                {dataRoomList.map((item: Room) => (
                  <Select.Option
                    key={item.id}
                    value={item.id}
                    label={item.name}
                  >
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name={'rateplan_id'}
              label="Rate Plant"
              rules={[
                { required: true, message: 'Please enter RatePlan name' },
              ]}
            >
              <Select
                showSearch
                placeholder="Select a Rate Plan"
                optionFilterProp="label"
                value={form.getFieldValue('rateplan_id')}
                filterOption={(input, option) => {
                  const label = option?.label
                  if (typeof label === 'string') {
                    return label.toLowerCase().includes(input.toLowerCase())
                  }
                  return false
                }}
                className="w-full"
              >
                {dataRatePlantList.map((item: RatePlant) => (
                  <Select.Option
                    key={item.id}
                    value={item.id}
                    label={item.name}
                  >
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name={'calendar_id'}
              label="Select Calendar Now"
              rules={[{ required: true, message: 'Please enter start date' }]}
            >
              <Select
                showSearch
                placeholder="Select a calendar"
                optionFilterProp="label"
                value={form.getFieldValue('calendar_id')}
                filterOption={(input, option) => {
                  const label = option?.label
                  if (typeof label === 'string') {
                    return label.toLowerCase().includes(input.toLowerCase())
                  }
                  return false
                }}
                className="w-full"
              >
                {dataCalendar.map((event: Calendar) => (
                  <Select.Option
                    key={event.id}
                    value={event.id}
                    label={event.name}
                  >
                    {event.price}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <div className="flex flex-row">
              <Form.Item
                className="basis-1/2 me-2"
                name={'reservation_date'}
                label="Reservation Date"
                rules={[
                  { required: true, message: 'Please enter reservation date' },
                ]}
              >
                <Input type="date" />
              </Form.Item>
              <Form.Item
                name={'check_in'}
                label="Check In"
                className="basis-1/2 ms-2"
                rules={[{ required: true, message: 'Please Check In Date' }]}
              >
                <Input type="date" />
              </Form.Item>
            </div>
            <div className="flex flex-row">
              <Form.Item
                name={'check_out'}
                label="End Date"
                className="basis-1/2 ms-2"
                rules={[{ required: true, message: 'Please Check End Date' }]}
              >
                <Input type="date" />
              </Form.Item>
              <Form.Item
                name={'name'}
                label="Name"
                className="basis-1/2 ms-2"
                rules={[{ required: true, message: 'Please Input name' }]}
              >
                <Input />
              </Form.Item>
            </div>


          </div>
        </Form>
      </Modal>
    </Layout>
  )
}
export default Booking
