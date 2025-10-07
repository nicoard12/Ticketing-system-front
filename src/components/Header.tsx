import React from 'react'
import { useNavigate } from 'react-router-dom'
import Buscador from './Buscador'

function Header() {
  const navigate = useNavigate()


  return (
    <div className='bg-primary text-primary-foreground p-4 py-6 text-lg sm:text-2xl flex justify-between'>
      <p className='italic cursor-pointer' onClick={() => navigate('/')}>TicketingSystem</p>
      <Buscador />
      <p>User</p>
    </div>
  )
}

export default Header