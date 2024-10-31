'use client'
import { Button, Form, Input, Modal, Table, Upload } from 'antd'
import Layout from '../../layout/index'
import useRoomApi from '@/service/api/room'
import { useModal } from '@/service/ui/useModal'
import { useEffect, useMemo, useState } from 'react'
import { PlusOutlined, UploadOutlined } from '@ant-design/icons'
import { Columns } from './TableData'


const Room = () => {
  const [roomData, setRoomData] = useState<Room[]>([])
  const [idRoomData, setIdRoomData] = useState<number | null>(null)
  const [fileList, setFileList] = useState<any[]>([]);

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
  const handleFileChange = ({ fileList }: any) => {
    setFileList(fileList);
  };

  const onSubmit = async () => {
    form
      .validateFields()
      .then(async (value: RoomCreate) => {
        const formData = new FormData();
        formData.append('name', value.name.toString());
        formData.append('description', value.description.toString());
        formData.append('feature', value.feature.toString());
        formData.append('published', value.published.toString());
        formData.append('availability', value.availability.toString());
  
        fileList.forEach((file) => {
          formData.append('images', file.originFileObj); // Append each file to 'images'
        });
  
        try {
          if (idRoomData) {
            formData.append('_method', 'PUT');
            // Panggil fungsi API dengan FormData
            await onUpdateRoom(formData, idRoomData);
          } else {
            await onCreateRoom(formData);
          }
        } catch (error) {
          console.log('error message : ', error);
        }
      })
      .catch((error) => {
        console.error('Failed to submit form:', error);
      });
  };
  useEffect(() => {
    refreshDataTable()
  }, [])

  const showAddRoomModal = () => {
    showModal()
    setFileList([]);
    form.resetFields()
    setIdRoomData(null)
  }

  const editRoom = async (id: number) => {}

  const deleteRoom = async (id: number) => {}

  return (
    <Layout>
      <div className="flex pb-2">
        <Button type="primary" onClick={showAddRoomModal}>
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
        <Form layout="vertical" form={form} onFinish={onSubmit}>
          <div className="flex flex-col">
            <Form.Item
              name={'name'}
              label={'Name Room'}
              rules={[{ required: true, message: 'Please enter room name' }]}
            >
              <Input type="text" placeholder="input name" />
            </Form.Item>
            <Form.Item
              name={'description'}
              label={'Description'}
              rules={[{ required: true, message: 'Please enter room name' }]}
            >
              <Input type="text" placeholder="Input Description" />
            </Form.Item>
            <Form.Item
              name={'feature'}
              label={'Feature'}
              rules={[{ required: true, message: 'Please enter Feature' }]}
            >
              <Input type="text" placeholder="Input Feature" />
            </Form.Item>
            <Form.Item
              name={'published'}
              label={'Published'}
              rules={[{ required: true, message: 'Please enter Published' }]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              name={'availability'}
              label={'Availability'}
              rules={[{ required: true, message: 'Please enter Published' }]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              name={'images'}
              label={'Images'}
              rules={[{ required: true, message: 'Please enter Images' }]}
            >
              <Upload
                 listType="picture"
                 fileList={fileList}
                 onChange={handleFileChange}
                 beforeUpload={() => false} // Prevent auto upload
              >
                <Button type="primary" icon={<UploadOutlined />}>
                  Upload
                </Button>
              </Upload>
            </Form.Item>
          </div>
          <Button type="primary" onClick={() => form.submit()}>
            Submit
          </Button>
        </Form>
      </Modal>
    </Layout>
  )
}

export default Room
