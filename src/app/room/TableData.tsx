import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Space, Tag } from 'antd'
import { ColumnsType } from 'antd/es/table'

export const Columns = (
  onEdit: (id: number) => void,
  onDelete: (id: number) => void,
): ColumnsType<Room> => [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    sorter: (a: Room, b: Room) => a.id - b.id,
    width: 30,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Feature',
    dataIndex: 'feature',
    key: 'feature',
  },
  {
    title: 'Published',
    dataIndex: 'published',
    key: 'published',
    render: (published) => (published ? 'Yes' : 'No'), // Assuming 1 for yes, 0 for no
  },
  {
    title: 'Availability',
    dataIndex: 'availability',
    key: 'availability',
    render: (availability) => (
      <Tag color={availability ? 'green' : 'volcano'}>
        {availability ? 'Available' : 'Unavailable'}
      </Tag>
    ),
  },
  {
    title: 'Images',
    dataIndex: 'images',
    key: 'images',
    render: (images) => (
      <img
        src={`https://baharmportodesain.my.id/public/${images}`}
        alt="Room"
        style={{ width: '50px', height: 'auto' }}
      />
    ),
  },
  {
    title: 'Actions',
    key: 'actions',
    render: (_, record: Room) => (
      <Space size="middle">
        <Button
          type="primary"
          onClick={() => onEdit(record.id)}
          icon={<EditOutlined />}
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
    width: 100,
  },
]
