import type { Evento } from '@/api/eventos'
import { useAuth0 } from '@auth0/auth0-react';
import React from 'react'
import { useNavigate } from 'react-router-dom'

type EventoBoxProps = {
  evento: Evento;
}

function EventoBox({ evento }: EventoBoxProps) {
  const navigate= useNavigate()
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const goToUnEvento= () =>{
    if (!isAuthenticated) loginWithRedirect()
    else navigate(`/evento/${evento._id}`)
  }

  return (
    <div onClick={goToUnEvento} className='bg-card shadow rounded flex flex-col cursor-pointer hover:scale-[1.01] transition-transform max-w-[200px] sm:max-w-[220px] md:max-w-[240px] w-full'>
      <div className='aspect-square flex items-center justify-center overflow-hidden rounded-t border-x border-gray-400'>
        <img
          src={evento.imagenUrl}
          alt={`Imagen de : ${evento.titulo}`}
          className='object-cover w-full h-full'
        />
      </div>
      <div className='p-2 flex items-center justify-center border-x border-b border-gray-400 rounded-b'>
        <h1 className='text-sm sm:text-md md:text-lg font-semibold h-10 truncate '>{evento.titulo}</h1>
      </div>
    </div>
  )
}

export default EventoBox