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
import clearTimeInDate from '@/service/hooks/useDateClearTime'
const Booking = () => {
  const [booking, setBooking] = useState<Booking[]>([])
  const [idBooking, setIdBooking] = useState<number | null>(null)
  const [form] = Form.useForm()
  const {
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

  const refreshData = async () => {
    const data = await onGetListBooking()
    setBooking(data)
  }
  useEffect(() => {
    refreshData()
  }, [])
  const { open, confirmLoading, showModal, handleOk, handleCancel } = useModal()

  const submitEvent = () => {
    form.validateFields().then(async (values) => {
      if (idBooking) {
        const valuesUpdate: BookingUpdate = {
          room_id: values.room_id.value,
          rateplan_id: values.rateplan_id,
          calendar_id: values.calendar_id,
          reservation_date: values.reservation_date,
          check_in: values.check_in,
          check_out: values.check_out,
          name: values.name,
          email: values.email,
          phone_number: values.phone_number,
          _method: 'PUT',
        }
        console.log(valuesUpdate)
        await onUpdateBooking(valuesUpdate, idBooking).then(() => {
          handleOk()
          refreshData()
          form.resetFields()
        })
      } else {
        await onCreateBooking(values).then(async () => {
          handleOk()
          refreshData()
        })
      }
    })
  }

  const modalResetForm = () => {
    form.setFieldsValue({
      room_id: null,
      rateplan_id: null,
      calendar_id: null,
      reservation_date: null,
      check_in: null,
      check_out: null,
      name: null,
      email: null,
      phone_number: null,
    })
    setIdBooking(null)
    showModal()
    refreshData()
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

  const bookingData = useMemo(() => {
    return booking
  }, [booking])

  const editBooking = async (id: number) => {
    modalResetForm()
    await onfindIdBooking(id).then((dataFind) => {
      form.setFieldsValue({
        room_id:dataFind.room_id,
        rateplan_id: dataFind.rateplan_id,
        calendar_id: dataFind.calendar_id,
        reservation_date: dataFind.reservation_date,
        check_in: clearTimeInDate(dataFind.check_in),
        check_out: clearTimeInDate(dataFind.check_out),
        name: dataFind.name,
        email: dataFind.email,
        phone_number: dataFind.phone_number,
      })
      setIdBooking(dataFind.id)
    })
  }
  const deleteBooking = async (id: number) => {
    await onDeleteBooking(id).then(() => {
      refreshData()
    })
  }

  return (
    <Layout>
      <Button
        type="primary"
        className="mb-2"
        onClick={() => {
          modalResetForm()
        }}
      >
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
        <Form onFinish={submitEvent} layout="vertical" form={form}>
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
                
                filterOption={(input, option) => {
                  const label = option?.title;
                  if (typeof label === 'string') {
                    return label.toLowerCase().includes(input.toLowerCase());
                  }
                  return false;
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
                    {event.room}
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
            <div className="flex flex-row">
              <Form.Item
                name={'email'}
                label="Email"
                className="basis-1/2 me-2"
                rules={[{ required: true, message: 'Please Input email' }]}
              >
                <Input type="email" />
              </Form.Item>
              <Form.Item
                name={'phone_number'}
                label="Phone Number"
                className="basis-1/2 ms-2"
                rules={[
                  { required: true, message: 'Please Input phone number' },
                ]}
              >
                <Input type="number" />
              </Form.Item>
            </div>

            <Button type="primary" onClick={() => form.submit()}>
              Submit
            </Button>
          </div>
        </Form>
      </Modal>
    </Layout>
  )
}
export default Booking
