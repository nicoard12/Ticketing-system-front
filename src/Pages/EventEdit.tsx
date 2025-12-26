import { getEventById, updateEvent, type Event } from '@/api/events'
import EventForm from '@/components/event/EventForm'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

function EventEdit() {
  const [loading, setLoading]= useState(false)
  const [event, setEvent]= useState<Event | null>(null)
  const { id }= useParams()
  const navigate= useNavigate()

  const editarEvento= async (e: Omit<Event, "_id" | "createdBy">, image?: File | null) =>{
    try {
      await updateEvent(event!._id, e, image); 
      toast.success("Evento actualizado");
      navigate(`/evento/${id}`)              
    } catch (err) {
      toast.error(err.message);
      setLoading(false)
    }
  }


  useEffect(() =>{
    const getEvent= async () =>{
      const response= await getEventById(id!)
      setEvent(response)
    }


    if (id) getEvent()
  },[id])

  return (
    <div className='flex flex-col gap-6 justify-center items-center'>
      <h1 className='text-3xl font-semibold'>Editar evento</h1>
      <EventForm submit={editarEvento} loading={loading} setLoading={setLoading} eventoEditable={event} />
    </div>
  )
}

export default EventEdit