import { Button, Space, Tooltip } from 'antd'
import { ColumnsType } from 'antd/es/table'

import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

export const Columns = (
  onEdit: (id: number) => void,
  onDelete: (id: number) => void,
): ColumnsType<Booking> => [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    sorter: (a: Booking, b: Booking) => a.id - b.id,
    width: 70,
  },
  {
    title: 'Room',
    dataIndex: 'room',
    sorter: (a: Booking, b: Booking) => a.room.localeCompare(b.room),
    key: 'room',
  },
  {
    title: 'Rate Plan',
    dataIndex: 'rateplan',
    sorter: (a: Booking, b: Booking) => a.rateplan.localeCompare(b.rateplan),
    key: 'rateplan',
  },
  {
    title: 'Calendar',
    dataIndex: 'calendar',
    sorter: (a: Booking, b: Booking) => a.calendar.localeCompare(b.calendar),
    key: 'calendar',
  },
  {
    title: 'Reservation Number',
    dataIndex: 'reservation_number',
    sorter: (a: Booking, b: Booking) =>
      a.reservation_number - b.reservation_number,
    key: 'reservation_number',
  },
  {
    title: 'Reservation Date',
    dataIndex: 'reservation_date',
    sorter: (a: Booking, b: Booking) => a.reservation_date - b.reservation_date,
    key: 'reservation_date',
  },
  {
    title: 'Check In',
    dataIndex: 'check_in',
    sorter: (a: Booking, b: Booking) => a.check_in.localeCompare(b.check_in),
    key: 'check_in',
  },
  {
    title: 'Check Out',
    dataIndex: 'check_out',
    sorter: (a: Booking, b: Booking) => a.check_out.localeCompare(b.check_out),
    key: 'check_out',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    render: (text: string | null | undefined) => (
      <Tooltip title={text || 'No Detail'}>
        {text && text.length > 50
          ? `${text.substring(0, 50)}...`
          : text || 'No Detail'}
      </Tooltip>
    ),
    sorter: (a: Booking, b: Booking) => a.name.localeCompare(b.name),
    key: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    sorter: (a: Booking, b: Booking) => a.email.localeCompare(b.email),
    key: 'email',
  },
  {
    title: 'Phone Number',
    dataIndex: 'phone_number',
    sorter: (a: Booking, b: Booking) =>
      a.phone_number.localeCompare(b.phone_number),
    key: 'phone_number',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_: any, record: Booking) => (
      <Space size="middle">
        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={() => onEdit(record.id)}
        >
          Edit
        </Button>
        <Button
          type="primary"
          danger
          icon={<DeleteOutlined />}
          onClick={() => onDelete(record.id)}
        >
          Delete
        </Button>
      </Space>
    ),
    width: 150,
  },
]
