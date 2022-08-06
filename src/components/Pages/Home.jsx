import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {format, register} from 'timeago.js'
import './home.css'
import { URL } from '../../Url'


const Home = () => {

  // Seteo mis estados de mis constantes

  const [notas, setNotas] = useState([])
  const [token, setToken] = useState('')

  // Funcion que me traiga todas las notas con autorizacion del token

  const getNotes = async (token) => {
    const res = await axios.get(`${URL}/api/notes`, {
      headers: { Authorization: token }
    })

    setNotas(res.data)
  }

  // Obtener el token, setearlo al estado y si existe que me ejecute la funcion

  useEffect(() => {

    const token = localStorage.getItem('token')
    setToken(token)
    if (token) {
      getNotes(token)
    }
  },[])

  const localeFunc = (number, index, totalSec) => {
    return [
      ['justo ahora', 'ahora mismo'],
      ['hace %s segundos', 'en %s segundos'],
      ['hace 1 minuto', 'en 1 minuto'],
      ['hace %s minutos', 'en %s minutos'],
      ['hace 1 hora', 'en 1 hora'],
      ['hace %s horas', 'en %s horas'],
      ['hace 1 dia', 'en 1 dia'],
      ['hace %s dias', 'en %s dias'],
      ['hace 1 semana', 'en 1 semana'],
      ['hace %s semanas', 'en %s semanas'],
      ['1 mes', 'en 1 mes'],
      ['hace %s meses', 'en %s meses'],
      ['hace 1 año', 'en 1 año'],
      ['hace %s años', 'en %s años']
    ][index]
  }

  register('es_ES', localeFunc)


  // Eliminar nota

  const deleteNote = async (id) => {

    try {
      if (token) {
        await axios.delete(`${URL}/api/notes/${id}`, {
          headers: {Authorization: token}
        })
        getNotes(token)
      }
    } catch (error) {
      window.location.href = "/"
    }
  }


  return (
    <div className='nota-wrapper'>
      {
        notas.map(nota => (
          <div key={nota._id} className='card'>
            <h4 className='card-title'>{nota.title}</h4>
            <div className='text-box'>
              <p>{nota.content}</p>
            </div>
            <p className='date'>{format(nota.date, 'es_ES')}</p>
            <div className='card-footer'>
              <p className='user-text'>{nota.name}</p>
              <Link to={`editar/${nota._id}`}>Editar</Link>
            </div>
            <button className='delete-btn' onClick={()=> deleteNote(nota._id)}>
              <img src="https://img.icons8.com/ios-filled/15/ffffff/delete-sign--v1.png" alt='close-card' />
            </button>
          </div>
        ))
      }

    </div>
  )
}

export default Home