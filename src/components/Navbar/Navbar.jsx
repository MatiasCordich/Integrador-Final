import { useState } from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'

const Navbar = ({setIsLogin}) => {

    const [open, setOpen] = useState(false)

    //Abrir navbar

    const openNavbar = () => {
        setOpen(!open)
    }

    // Cerrar Navbar

    const closeNavbar = () => {
        setOpen(false)
    }

    // Cerrar sesion

    const logout = () => {
      localStorage.clear()
      setIsLogin(false)
    }


    return (
        <header className='header'>
            <nav className='navbar'>
                <div className='logo'>
                    <Link to="/">
                        <img src="https://img.icons8.com/wired/50/000000/note.png" alt='logo' />
                    </Link>
                    {
                        !open
                            ? <img onClick={openNavbar} className='btn-open' src="https://img.icons8.com/ios-filled/40/000000/menu--v1.png" alt='open' />
                            : <img onClick={closeNavbar} className='btn-close' src="https://img.icons8.com/ios-filled/40/000000/delete-sign--v1.png" alt='close' />
                    }
                </div>
                <ul className={`links ${open ? 'show-links' : ''}`}>
                    <li>
                        <Link to="/">
                            Inicio
                        </Link>
                    </li>
                    <li>
                        <Link to="/crear">
                            Crear Nota
                        </Link>
                    </li>
                    <li>
                        <Link onClick={logout} to="/">
                            Logout
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar