'use client'
import { Table } from 'antd'
import Layout from '../../layout/index'
import { Columns } from './TableData'
import useCalendarApi from '@/service/api/calendar'
const Calendar = () => {
  const data = useCalendarApi(true)
  console.log(data.calendar)
  return (
    <Layout>
      <Table<Calendar>
        columns={Columns}
        dataSource={data.calendar}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
    </Layout>
  )
}

export default Calendar
