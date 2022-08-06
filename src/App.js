import './App.css'
import axios from 'axios'
import Login from './components/Login/Login';
import Notas from './components/Notas/Notas';
import { useEffect, useState } from 'react';

function App() {

  // Seteo los estados de isLogin

  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {

    // Funcion que chequea si estamos logueados
    const checkLogin = async () => {

      // Tomamos el token de nuestro localStorage
      const token = localStorage.getItem('token')

      // Validamos mediante el token si estamos logueados o no
      if (token) {
        const verified = await axios.get('/users/verify', {
          headers: {Authorization: token}
        })
        
        // Seteamos el estado de login en true

        setIsLogin(verified.data)

        // Si la data de verified es false, limpiamos el token del localStorage

        if (verified.data === false) {
          return localStorage.clear()
        }
      } else {
        setIsLogin(false)
      }
    }
    checkLogin()
  })

  return (
    <div className="wrapper">
      {
        isLogin
          ? <Notas setIsLogin={setIsLogin} />
          : <Login setIsLogin={setIsLogin} />
      } 


    </div>
  );
}

export default App;
