import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { type Evento, getEventoById } from '@/api/eventos'

function UnEvento() {
  const {id} = useParams()
  const [evento, setEvento]= useState<Evento | null>(null)

  useEffect(() =>{
    const getEvento= async () =>{
      const response= await getEventoById(id)
      console.log(response)
      setEvento(response)
    }

    if (id) getEvento()
  },[id])

  return (
    <div>
      {evento && <h1>{evento.titulo}</h1>}
    </div>
  )
}

export default UnEvento