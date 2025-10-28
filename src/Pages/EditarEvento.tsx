import { getEventoById, updateEvento, type Evento } from '@/api/eventos'
import FormEvento from '@/components/evento/FormEvento'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

function EditarEvento() {
  const [loading, setLoading]= useState(false)
  const [evento, setEvento]= useState<Evento | null>(null)
  const { id }= useParams()
  const navigate= useNavigate()

  const editarEvento= async (e: Omit<Evento, "_id">, imagen?: File | null) =>{
    try {
      console.log("envio: ", e)
      await updateEvento(evento._id, e, imagen); 
      toast.success("Evento actualizado");
      navigate(`/evento/${id}`)              
    } catch (err) {
      toast.error(err.message);
      setLoading(false)
    }
  }

  

  useEffect(() =>{
    const getEvento= async () =>{
      const response= await getEventoById(id)
      setEvento(response)
    }


    if (id) getEvento()
  },[id])

  return (
    <div className='p-3 flex flex-col gap-6 w-full justify-center items-center'>
      <h1 className='text-3xl font-semibold'>Editar evento</h1>
      <FormEvento submit={editarEvento} loading={loading} setLoading={setLoading} eventoEditable={evento} />
    </div>
  )
}

export default EditarEvento