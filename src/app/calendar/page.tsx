'use client'
import { Button, Input, Modal, Select, Table } from 'antd'
import Layout from '../../layout/index'
import { Columns } from './TableData'
import useCalendarApi from '@/service/api/calendar'
import { useModal } from '@/service/ui/useModal'
import { useForm } from '@/service/hooks/useForm'
import { useEffect, useState } from 'react'
import useRoomApi from '@/service/api/room'


const inisialCalendar: CalendarCreate = {
  room_id: 0,
  rateplan_id: 0,
  date: '',
  availability: 0,
}

const Calendar = () => {
  // State untuk menyimpan data kalender
  const [calendarData, setCalendarData] = useState<Calendar[]>([]);

  // Mengambil data dari API langsung dengan hook
  const { calendar, loading, error } = useCalendarApi(true); // Data kalender langsung diambil dari hook
  const room = useRoomApi(true); // Data room langsung diambil dari hook

  const [selectedItems, setSelectedItems] = useState<Room[]>([]);
  const [idCalendar, setIdCalendar] = useState<number | null>(null); 

  const filteredOptions = room.roomItems.filter((o) => !selectedItems.includes(o));
  const { open, confirmLoading, showModal, handleOk, handleCancel } = useModal();

  const { form, handleChange, resetForm } = useForm(inisialCalendar);

  // Menghandle pemilihan dari Select component
  const handleSelect = (value: number) => {
    console.log(value);
    const selectedRoom = room.roomItems.find((room) => room.id === value);
    if (selectedRoom) {
      form.room_id = selectedRoom.id;
      setSelectedItems([...selectedItems, selectedRoom]);
    }
  };

  // Submit form untuk create atau update
  const submit = async (e: any) => {
    e.preventDefault();
    if (idCalendar) {
      // Update
      const updateData: CalendarUpdate = {
        ...form,
        _method: 'PUT',
      };
      await useCalendarApi().onUpdateCalendar(updateData, idCalendar);
    } else {
      // Create
      await useCalendarApi().onCreateCalendar(form);
    }
    handleOk(); // Menutup modal setelah submit berhasil
    resetForm(); // Reset form setelah submit
  };

  useEffect(() => {
    // Set data kalender setiap kali data berubah
    if (calendar) {
      setCalendarData(calendar);
    }
  }, [calendar]); // Data diperbarui ketika `calendar` dari hook berubah


  return (
    <Layout>
      <div className="flex">
        <Button type="primary" onClick={showModal} className="mb-2">
          Add New Calendar
        </Button>
      </div>
      <Table<Calendar>
        columns={Columns}
        dataSource={calendarData}
        loading={loading}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
      <Modal
        title="Calendar Form"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <form onSubmit={submit}>

        </form>
        <div className="flex">
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
            onSelect={handleSelect}
            className='w-full m-2' 
          >
            {filteredOptions.map((item: Room) => (
              <Select.Option key={item.id} value={item.id} label={item.name}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
          <Input className='m-2' />
        </div>
      </Modal>
    </Layout>
  )
}

export default Calendar
