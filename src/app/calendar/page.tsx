'use client'
import { Button, Modal, Table } from 'antd'
import Layout from '../../layout/index'
import { Columns } from './TableData'
import useCalendarApi from '@/service/api/calendar'
import { useModal } from '@/service/ui/useModal'
import { useForm } from '@/service/hooks/useForm'

const Calendar = () => {
  const data = useCalendarApi(true)
  const { open, confirmLoading, showModal, handleOk, handleCancel } = useModal()
  const inisialCalendar : CalendarCreate = {
    room: "",
    name: "",
    detail: "",
    price: 0
  }
  const { form, handleChange, resetForm } = useForm(inisialCalendar);
  const submit = async (e:any ,id?:number)=>{
    e.preventDefault()
    if(id){
    const updateData: CalendarUpdate = {
      ...form,
      _method: 'PUT', 
    };
    await useCalendarApi().onUpdateCalendar(updateData, id);
    }else{
      await useCalendarApi().onCreateCalendar(form)
    }
    await useCalendarApi(true)
  }

  return (
    <Layout>
      <div className="flex">
        <Button type='primary' onClick={showModal} className='mb-2'>
          Add New Calendar
        </Button>
      </div>
      <Table<Calendar>
        columns={Columns}
        dataSource={data.calendar}
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
        

      </Modal>


    </Layout>
  )
}

export default Calendar
