import React from 'react'
import Nav from './nav/Nav'
import Mainroutes from './routes/mainroutes'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { asyncGetChats } from './redux/actions/ChatActions'
import Chat from './pages/Chat'

const App = () => {

  const dispatch=useDispatch()


  useEffect(() => {
    
  dispatch(asyncGetChats())
   
  }, [])
  

  return (
    <div>


      {/* <Nav/> */}
      <Chat/>
     <Mainroutes/>
    </div>
  )
}

export default App