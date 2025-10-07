import React from 'react'
import { useNavigate } from 'react-router-dom'
import LogoUser from './LogoUser'
import { Button } from './ui/button'

function Header() {
  const navigate = useNavigate()

  const goRegistrarEvento= () =>{
    navigate("/registrar-evento")
  }

  return (
    <div className='bg-primary text-primary-foreground p-5 text-lg sm:text-2xl flex flex-col gap-5'>
      <div className='flex justify-between'>
        <p className='italic cursor-pointer' onClick={() => navigate('/')}>TicketingSystem</p>
        <LogoUser />
      </div>
      <div className='flex gap-2 justify-between'>
        <div></div>
        <Button size={"sm"} onClick={goRegistrarEvento} className='cursor-pointer bg-card text-black hover:bg-gray-400'>
          Añadir evento
        </Button>
      </div>
    </div>
  )
}

export default Header