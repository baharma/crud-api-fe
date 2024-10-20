'use client'
import { Button, Form, Input, Modal, Select, Table } from 'antd'
import Layout from '../../layout/index'
import { useState, useEffect, useMemo } from 'react'
import useCalendarApi from '@/service/api/calendar'
import useRoomApi from '@/service/api/room'
import useRatePlantApi from '@/service/api/ratePlan'
import { useModal } from '@/service/ui/useModal'
import { Columns } from './TableData'

const Calendar = () => {
  const [calendarData, setCalendarData] = useState<Calendar[]>([])
  const [idCalendar, setIdCalendar] = useState<number | null>(null)
  const { open, confirmLoading, showModal, handleOk, handleCancel } = useModal()
  const [forms] = Form.useForm()
  const {
    loading,
    onCreateCalendar,
    onGetCalendarList,
    onUpdateCalendar,
    onFindIdCalendar,
    onDeleteCelender,
  } = useCalendarApi()
  const memoizedCalendarData = useMemo(() => {
    return calendarData
  }, [calendarData])

  const refreshData = async () => {
    const datas = await onGetCalendarList()
    setCalendarData(datas)
  }
  const room = useRoomApi(true)
  const rateplan = useRatePlantApi(true)

  const filteredOptions = useMemo(() => {
    return room.roomItems
  }, [room.roomItems]) 

  const filterRateOption = useMemo(() => {
    return rateplan.ratePlantItems
  }, [rateplan.ratePlantItems])

  const editNow = async (id: number) => {
    const dataFind = await onFindIdCalendar(id)
    forms.setFieldsValue({
      room_id: dataFind.data.room_id,
      rateplan_id: dataFind.data.rateplan_id,
      date: dataFind.data.date,
      availability: dataFind.data.availability,
    })
    setIdCalendar(dataFind.data.room_id)
    showModal()
  }
  const deleteNow = async (id: number) => {
    await onDeleteCelender(id).then(async () => {
      refreshData()
    })
  }

  const onSubmit = async (values: CalendarCreate) => {
    if (idCalendar) {
      const updateValues: CalendarUpdate = {
        ...values,
        _method: 'PUT',
      }
      await onUpdateCalendar(updateValues, idCalendar).then(async () => {
        handleOk()
        const datas = await onGetCalendarList()
        setCalendarData(datas)
      })
    } else {
      await onCreateCalendar(values).then(async () => {
        handleOk()
        refreshData()
      })
    }
    setIdCalendar(null)
    forms.resetFields()
  }

  useEffect(() => {
    refreshData()
  }, [])

  return (
    <Layout>
      <div className="flex">
        <Button type="primary" onClick={showModal} className="mb-2">
          Add New Calendar
        </Button>
      </div>
      <Table<Calendar>
        columns={Columns(editNow, deleteNow)}
        dataSource={memoizedCalendarData}
        loading={loading}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
      <Modal
        title="Calendar Form"
        open={open}
        confirmLoading={confirmLoading}
        footer={null}
        onCancel={handleCancel}
      >
        <Form onFinish={onSubmit} layout="vertical" form={forms}>
          <Form.Item
            name="room_id"
            label="Room"
            rules={[{ required: true, message: 'Please select a room' }]}
          >
            <Select
              showSearch
              placeholder="Search to room"
              optionFilterProp="label"
              value={forms.getFieldValue('room_id')}
              filterOption={(input, option) => {
                const label = option?.label
                if (typeof label === 'string') {
                  return label.toLowerCase().includes(input.toLowerCase())
                }
                return false
              }}
              className="w-full"
            >
              {filteredOptions.map((item: Room) => (
                <Select.Option key={item.id} value={item.id} label={item.name}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="date"
            label="Date"
            rules={[{ required: true, message: 'Please select a date' }]}
          >
            <Input type="date" />
          </Form.Item>

          <Form.Item
            name="availability"
            label="Availability"
            rules={[{ required: true, message: 'Please enter availability' }]}
          >
            <Input type="number" min={0} />
          </Form.Item>
          <Form.Item
            name="rateplan_id"
            label="Rate Plan"
            rules={[{ required: true, message: 'Please select a rateplan' }]}
          >
            <Select
              showSearch
              placeholder="Search to Select"
              optionFilterProp="label"
              value={forms.getFieldValue('rateplan_id')}
              filterOption={(input, option) => {
                const label = option?.label
                if (typeof label === 'string') {
                  return label.toLowerCase().includes(input.toLowerCase())
                }
                return false
              }}
              className="w-full"
            >
              {filterRateOption.map((item: RatePlant) => (
                <Select.Option key={item.id} value={item.id} label={item.name}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" onClick={() => forms.submit()}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  )
}

export default Calendar
