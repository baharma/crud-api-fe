// TableData.tsx atau columns.tsx
import React from 'react'
import { ColumnsType } from 'antd/es/table'
import { Space, Button, Tooltip } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

export const Columns = (
  onEdit: (id: number) => void,
  onDelete: (id: number) => void,
): ColumnsType<Calendar> => [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    sorter: (a: Calendar, b: Calendar) => a.id - b.id,
    width: 70,
  },
  {
    title: 'Room',
    dataIndex: 'room',
    key: 'room',
    sorter: (a: Calendar, b: Calendar) => a.room.localeCompare(b.room),
    width: 150,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text: string | null | undefined) => (
      <Tooltip title={text || 'No Detail'}>
        {text && text.length > 50
          ? `${text.substring(0, 50)}...`
          : text || 'No Detail'}
      </Tooltip>
    ),
    sorter: (a: Calendar, b: Calendar) => a.name.localeCompare(b.name),
    width: 200,
  },
  {
    title: 'Slug',
    dataIndex: 'slug',
    key: 'slug',
    render: (text: string | null | undefined) => (
      <Tooltip title={text || 'No Detail'}>
        {text && text.length > 50
          ? `${text.substring(0, 50)}...`
          : text || 'No Detail'}
      </Tooltip>
    ),
    width: 200,
  },
  {
    title: 'Detail',
    dataIndex: 'detail',
    key: 'detail',
    render: (text: string | null | undefined) => (
      <Tooltip title={text || 'No Detail'}>
        {text && text.length > 50
          ? `${text.substring(0, 50)}...`
          : text || 'No Detail'}
      </Tooltip>
    ),
    width: 300,
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    render: (price: number | undefined | null) => {
      if (typeof price === 'number') {
        return `Rp.${price.toFixed(2)}`
      }
      return 'Rp.0.00'
    },
    sorter: (a: Calendar, b: Calendar) => a.price - b.price,
    width: 100,
  },
  {
    title: 'Action',
    key: 'action',
    render: (_: any, record: Calendar) => (
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
