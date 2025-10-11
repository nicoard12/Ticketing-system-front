import { createEvento, type Evento } from '@/api/eventos'
import FormEvento from '@/components/evento/FormEvento'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function RegistrarEvento() {
  const [loading, setLoading]= useState(false)
  const [error, setError]= useState("")
  const navigate= useNavigate()

  const newEvento= async (e: Omit<Evento, "_id">) =>{
    setError("");
    try {
      await createEvento(e);
      navigate("/")
    } catch (err) {
      setError(err.message); //TODO eliminar foto de cloudinary en caso de error
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className='p-3 flex flex-col gap-6 w-full justify-center items-center'>
      <h1 className='text-3xl font-semibold'>Crear evento</h1>
      <FormEvento submit={newEvento} loading={loading} setLoading={setLoading} setError={setError}>
        {error && <p className="text-red-500">{error}</p>}
      </FormEvento>
    </div>
  )
}

export default RegistrarEvento