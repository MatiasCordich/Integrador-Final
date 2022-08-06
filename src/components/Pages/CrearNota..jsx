import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import './crearnota.css'
import { URL } from '../../Url'

const CrearNota = () => {
  
  // Seteo las variables 

  const [nota, setNota] = useState({
    title: '',
    content: '',
    date: '',
  })

  // Declaro la variable navigate 

  const navigate = useNavigate()

  const onChangeInput = (e) => {

    const {name, value} = e.target
    setNota({...nota, [name]:value})

  }

  // Funcion crear nota

  const crearNota = async (e) => {
    
    e.preventDefault()

    try {

      const token = localStorage.getItem('token')

      if (token) {

        const {title, content, date} = nota

        const newNota = {
          title, content, date
        }

        await axios.post(`${URL}/api/notes`, newNota, {
          headers: {Authorization: token}
        })

        return navigate.push('/')
      }
    } catch (error) {
      window.location.href = '/'
    }
  }
  return (
    <div className='crear-nota-box'>
      <h2>Crear nota</h2>
      <form onSubmit={crearNota}>
        <div className='input-field'>
          <label htmlFor="title">Title</label>
          <input 
          type="text" 
          value={nota.title} 
          id='title' 
          name='title' 
          required
          onChange={onChangeInput} />
        </div>
        <div className='input-field'>
          <label htmlFor="content">Contenido</label>
          <textarea 
          type="text"
          value={nota.content} 
          id='content' 
          name='content' 
          required
          onChange={onChangeInput} />
        </div>
        <div className='input-field'>
          <label htmlFor="title">Fecha: {nota.date}</label>
          <input 
          type="date" 
          id='date' 
          name='date' 
          required
          onChange={onChangeInput} />
        </div>
        <button type='submit'>Guardar</button>
      </form>
    </div>
  )
}

export default CrearNota