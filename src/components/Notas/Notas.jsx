import React from 'react'
import Navbar from '../Navbar/Navbar'
import Home from '../Pages/Home'
import CrearNota from '../Pages/CrearNota.'
import EditarNota from '../Pages/EditarNota'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const Notas = ({setIsLogin}) => {
  return (
    <BrowserRouter>
      <div className='notas-pag'>
        <Navbar setIsLogin={setIsLogin}/>
        <section>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/crear" element={<CrearNota/>}/>
            <Route path="/editar/:id" element={<EditarNota/>}/>
          </Routes>
        </section>
      </div>
    </BrowserRouter>

  )
}

export default Notas