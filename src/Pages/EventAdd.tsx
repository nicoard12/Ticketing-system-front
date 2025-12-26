import { createEvent, type Event } from '@/api/events'
import EventForm from '@/components/event/EventForm'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

function RegistrarEvento() {
  const [loading, setLoading]= useState(false)
  const navigate= useNavigate()

  const newEvent= async (e: Omit<Event, "_id" | "createdBy">, image?: File | null) =>{
    try {
      await createEvent(e, image);
      toast.success("Evento creado");
      navigate("/")
    } catch (err) {
      toast.error(err.message); 
      setLoading(false)
    }
  }

  return (
    <div className='flex flex-col gap-6 justify-center items-center'>
      <h1 className='text-3xl font-semibold'>Crear evento</h1>
      <EventForm submit={newEvent} loading={loading} setLoading={setLoading} />
    </div>
  )
}

export default RegistrarEvento