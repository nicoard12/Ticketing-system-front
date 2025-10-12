import { getEventoById, updateEvento, type Evento } from '@/api/eventos'
import FormEvento from '@/components/evento/FormEvento'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function EditarEvento() {
  const [loading, setLoading]= useState(false)
  const [error, setError]= useState("")
  const [evento, setEvento]= useState<Evento | null>(null)
  const { id }= useParams()
  const navigate= useNavigate()

  const editarEvento= async (e: Omit<Evento, "_id">) =>{
    setError("");
    try {
      console.log("envio: ", e)
      await updateEvento(evento._id, e); //TODO eliminar de cloudinary en back en caso de haber cambiado la imagen (comparar en back la anterior url con la nueva)
      navigate(`/evento/${id}`)              
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
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
      <FormEvento submit={editarEvento} loading={loading} setLoading={setLoading} setError={setError} eventoEditable={evento}>
        {error && <p className="text-red-500">{error}</p>}
      </FormEvento>
    </div>
  )
}

export default EditarEvento