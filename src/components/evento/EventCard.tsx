import type { Event } from '@/api/events'
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom'

type EventCardProps = {
  event: Event;
}

function EventCard({ event }: EventCardProps) {
  const navigate= useNavigate()
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const goToEvent= () =>{
    if (!isAuthenticated) loginWithRedirect()
    else navigate(`/evento/${event._id}`)
  }

  return (
    <div data-cy="evento-box" onClick={goToEvent} className='hover:outline-black outline outline-gray-900/70 bg-card text-card-foreground shadow rounded flex flex-col cursor-pointer hover:scale-[1.01] transition-transform max-w-[200px] sm:max-w-[220px] md:max-w-[240px] w-full'>
      <div className='aspect-square flex items-center justify-center overflow-hidden rounded-t'>
        <img
          src={event.imagenUrl}
          alt={`Imagen de : ${event.titulo}`}
          className='object-cover w-full h-full '
        />
      </div>
      <div className='p-2 flex items-center justify-center border-x border-b border-gray-400 rounded-b'>
        <h1 className='text-sm sm:text-md md:text-lg font-semibold h-10 truncate '>{event.titulo}</h1>
      </div>
    </div>
  )
}

export default EventCard