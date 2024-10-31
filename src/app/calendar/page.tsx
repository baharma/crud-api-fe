'use client'
import { Button, Form, Input, Modal, Select, Table } from 'antd'
import Layout from '../../layout/index'
import { useState, useEffect, useMemo } from 'react'
import useCalendarApi from '@/service/api/calendar'
import useRoomApi from '@/service/api/room'
import useRatePlantApi from '@/service/api/ratePlan'
import { useModal } from '@/service/ui/useModal'
import { Columns } from './TableData'
import { error } from 'console'
import { findItemById } from '@/service/ui/useFind'

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

  const modalShowAndReset = () => {
    forms.resetFields([
      {
        room_id: null,
        rateplan_id: null,
        date: null,
        availability: null,
      },
    ])
    showModal()
    setIdCalendar(null)
  }
  const editNow = async (id: number) => {
    modalShowAndReset()
    await onFindIdCalendar(id)
      .then((dataFind) => {
        const matchedItemRoom = findItemById(filteredOptions, dataFind.room_id)
        const matcheItemRate = findItemById(
          filterRateOption,
          dataFind.rateplan_id,
        )
        forms.setFieldsValue({
          room_id: {
            value: matchedItemRoom.id,
            label: matchedItemRoom.name,
          },
          rateplan_id: {
            value: matcheItemRate.id,
            label: matcheItemRate.name,
          },
          date: dataFind.date,
          availability: dataFind.availability,
        })
        setIdCalendar(dataFind.room_id)
      })
      .catch((error) => {
        console.error('Failed to edit Calendar:', error)
      })
  }
  const deleteNow = async (id: number) => {
    await onDeleteCelender(id).then(async () => {
      refreshData()
    })
  }

  const onSubmit = async (values: any) => {
    if (idCalendar) {
      const updateValues: CalendarUpdate = {
        room_id: values.room_id.value ?? values.room_id,
        rateplan_id: values.room_id.value ?? values.room_id,
        date: values.date,
        availability: values.availability,
      }
      console.log(updateValues)
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
        <Button type="primary" onClick={modalShowAndReset} className="mb-2">
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
              labelInValue
              className="w-full"
              value={forms.getFieldValue('room_id')}
              onChange={(newValue) => {
                forms.setFieldsValue({ room_id: newValue })
              }}
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
              labelInValue
              value={forms.getFieldValue('rateplan_id')}
              filterOption={(input, option) => {
                const label = option?.label
                if (typeof label === 'string') {
                  return label.toLowerCase().includes(input.toLowerCase())
                }
                return false
              }}
              className="w-full"
              onChange={(newValue) => {
                forms.setFieldsValue({ rateplan_id: newValue })
              }}
            >
              {filterRateOption.map((item: RatePlant) => (
                <Select.Option key={item.id} value={item.id} label={item.name}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Button type="primary" onClick={() => forms.submit()}>
            Submit
          </Button>
        </Form>
      </Modal>
    </Layout>
  )
}

export default Calendar
