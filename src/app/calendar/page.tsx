'use client'
import { Button, Form, Input, Modal, Select, Table } from 'antd'
import Layout from '../../layout/index'
import { useState, useEffect } from 'react'
import useCalendarApi from '@/service/api/calendar'
import useRoomApi from '@/service/api/room'
import useRatePlantApi from '@/service/api/ratePlan'
import { useModal } from '@/service/ui/useModal'
import { Columns } from './TableData'

const Calendar = () => {
  const [calendarData, setCalendarData] = useState<Calendar[]>([])
  const [forms] = Form.useForm()
  const { calendar, loading, onCreateCalendar, onGetCalendarList } =
    useCalendarApi(true)
  const room = useRoomApi(true)
  const rateplan = useRatePlantApi(true)
  const [selectedItems, setSelectedItems] = useState<Room[]>([])
  const [rateOption, setrateOption] = useState<RatePlant[]>([])
  const filteredOptions = room.roomItems.filter(
    (o) => !selectedItems.includes(o),
  )
  const filterRateOption = rateplan.ratePlantItems.filter(
    (o) => !rateOption.includes(o),
  )
  const { open, confirmLoading, showModal, handleOk, handleCancel } = useModal()

  const onSubmit = async (values: CalendarCreate) => {
    await onCreateCalendar(values).then(async () => {
      handleOk()
      const datas = await onGetCalendarList()
      setCalendarData(datas)
    })
  }

  useEffect(() => {
    if (calendar) {
      setCalendarData(calendar)
    }
  }, [calendar])

  return (
    <Layout>
      <div className="flex">
        <Button type="primary" onClick={showModal} className="mb-2">
          Add New Calendar
        </Button>
      </div>
      <Table<Calendar>
        columns={Columns}
        dataSource={Array.isArray(calendarData) ? calendarData : []} // Pastikan dataSource adalah array
        loading={loading}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
      <Modal
        title="Calendar Form"
        open={open}
        confirmLoading={confirmLoading}
        footer={null}
      >
        <Form onFinish={onSubmit} layout="vertical" form={forms}>
          <Form.Item
            name="room_id"
            label="Room"
            rules={[{ required: true, message: 'Please select a room' }]}
          >
            <Select
              showSearch
              placeholder="Search to Select"
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
