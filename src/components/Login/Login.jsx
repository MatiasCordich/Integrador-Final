import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { URL } from '../../Url'
import './login.css'

const Login = ({setIsLogin}) => {

    // Seteo los estados iniciales 

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    })

    const [error,setError] = useState('')

    // Estado inicial para la posicion de formularios

    const [onLogin, setOnLogin] = useState(false)

    // Estilos para los formularios

    const style = {
        visibility: onLogin ? "visible" : "hidden",
        opacity: onLogin ? 1 : 0,
        transition: onLogin ? ".6s all" : ".6s all"
    }
    

    // Funcion que me tome los valores de los inputs

    const onChageInputValue = (e) => {
      const {name, value} = e.target
      setUser({...user, [name]:value})
      setError('')
    }

    // Funcion para registrarse

    const register = async (e) => {

        // Evito que se refresque la pagina

      e.preventDefault()

      try {

        // Hago un post con los datos de mis inputs
        const res = await axios.post(`${URL}/users/register`, {
            username: user.name,
            email: user.email,
            password: user.password,
        })

        // Seteo los inputs para vaciarlos

        setUser({
            name:'',
            email: '',
            password: '',
        })

        setError(res.data.msg)

      } catch (error) {

        // Si hay error que me muestre el mensaje que se setea en la conste error

        error.response.data.msg && setError(error.response.data.msg)
      }
    }

    // Funcion para loguearse

    const login = async (e) => {

        // Evito que se refresque la pagina

      e.preventDefault()

      try {

        // Hago un post con los datos de mis inputs

        const res = await axios.post(`${URL}/users/login`, {
            email: user.email,
            password: user.password
        })

        // Seteo los inputs para vaciarlos

        setUser({
            name:'',
            email: '',
            password: '',
        })

        // Guardo el token generado en el local storage

        localStorage.setItem('token', res.data.token)

        // Seteo el estado de isLogin a true

        setIsLogin(true)

      } catch (error) {

        // Si me da error que me muestre el mensaje y se setee el estado de mensaje

        error.response.data.msg && setError(error.response.data.msg)
      }
    }


    return (
        <section>
            <div className='login crear-nota-box'>
                <h2>Login</h2>
                <form onSubmit={login}>
                    <input
                        type="email"
                        name='email'
                        id='login-email'
                        placeholder='Email'
                        required
                        value={user.email}
                        onChange={onChageInputValue}
                    />
                    <input
                        type="password"
                        name='password'
                        id='login-password'
                        placeholder='Contraseña'
                        required
                        autoComplete='true'
                        value={user.password}
                        onChange={onChageInputValue}
                    />
                    <button type='submit'>Login</button>
                    <p>
                        No estas registrado?
                        <span onClick={()=> setOnLogin(true)}>Registrate</span>
                    </p>
                    <h3>{error}</h3>
                </form>
            </div>
            <div className='register crear-nota-box' style={style}>
                <h2>Registrarse</h2>
                <form onSubmit={register}>
                    <input
                        type="text"
                        name='name'
                        id='register-name'
                        placeholder='Nombre'
                        required
                        value={user.name}
                        onChange={onChageInputValue}
                    />
                    <input
                        type="email"
                        name='email'
                        id='register-email'
                        placeholder='Email'
                        required
                        value={user.email}
                        onChange={onChageInputValue}
                    />
                    <input
                        type="password"
                        name='password'
                        id='register-password'
                        placeholder='Contraseña'
                        autoComplete='true'
                        required
                        value={user.password}
                        onChange={onChageInputValue}
                    />
                    <button type='submit'>Registrarse</button>
                    <p>
                        Ya tienes una cuenta?
                        <span onClick={()=> setOnLogin(false)}>Logueate</span>
                    </p>
                    <h3>{error}</h3>
                </form>
            </div>
        </section>
    )
}

export default Login