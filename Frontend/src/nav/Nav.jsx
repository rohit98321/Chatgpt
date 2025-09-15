import React from 'react'
import { NavLink } from 'react-router-dom'

const Nav = () => {
  return (
    <nav className='flex gap-5 flex-col-reverse justify-between h-screen w-1/6 bg-neutral-900 absolute text-white p-5'>
       
       <NavLink to={"/register"} >user</NavLink>
       <NavLink to={"/createchat"} >newChat</NavLink>

    </nav>
  )
}

export default Nav