import type { Event } from '@/api/events'
import { useNavigate } from 'react-router-dom'

type EventCardProps = {
  event: Event;
}

function EventCard({ event }: EventCardProps) {
  const navigate = useNavigate()

  const goToEvent = () => {
    navigate(`/evento/${event._id}`)
  }

  return (
    <div
      data-cy="evento-box"
      onClick={goToEvent}
      className='group relative bg-card text-card-foreground shadow-md rounded-xl flex flex-col cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out max-w-[200px] sm:max-w-[220px] md:max-w-[240px] w-full overflow-hidden'
    >
      <div className='aspect-square flex items-center justify-center overflow-hidden'>
        <img
          src={event.imagenUrl}
          alt={`Imagen de : ${event.titulo}`}
          className='object-cover w-full h-full transition-transform duration-500 ease-out group-hover:scale-110'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
      </div>
      <div className='p-3 flex items-center justify-center bg-card border-t border-border/50'>
        <h1 className='text-sm sm:text-md md:text-lg font-bold h-10 truncate text-center group-hover:text-primary transition-colors duration-300'>
          {event.titulo}
        </h1>
      </div>
    </div>
  )
}

export default EventCard