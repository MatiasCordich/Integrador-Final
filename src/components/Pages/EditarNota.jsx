import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {useNavigate, useParams} from 'react-router-dom'
import './crearnota.css'
import { URL } from '../../Url'

const EditarNota = () => {
  
  // Seteo las variables 

  const [nota, setNota] = useState({
    title: '',
    content: '',
    date: '',
    id:''
  })


  // Declaro la variable navigate 

  const navigate = useNavigate()

  const {id} = useParams()

  // UseEffect para obtener la nota 

  useEffect(() => {
    const getNote = async () => {
      const token = localStorage.getItem('token')

      if (id) {
        const res = await axios.get(`${URL}/api/notes/${id}`, {
          headers: {Authorization: token}
        })

        setNota({
          title: res.data.title,
          content: res.data.content,
          date: new Date(res.data.date).toLocaleDateString(),
          id: res.data._id
        })

      }
    }
    getNote()

  },[id])

  // Funcion que agarre los valores de los inputs

  const onChangeInput = (e) => {

    const {name, value} = e.target
    setNota({...nota, [name]:value})

  }

  // Funcion editar nota

  const editarNota = async e => {
    
    e.preventDefault()

    try {
      const token = localStorage.getItem('token')

      if (token) {
        const {title, content, date, id} = nota

        const editedNota = {
          title,
          content,
          date
        }

        await axios.put(`${URL}/api/notes/${id}`, editedNota, {
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
      <h2>Editar nota</h2>
      <form onSubmit={editarNota}>
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
export default EditarNota