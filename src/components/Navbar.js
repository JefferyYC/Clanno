import { Link, useNavigate } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

//styles
import './Navbar.css'
import Logo from '../assets/clanno_logo.png'

export default function Navbar() {
    const navigate = useNavigate()
    const { logout, isPending } = useLogout()
    const { user } = useAuthContext()

    return (
        <div className="navbar">
            <ul>
                <li className='logo'>
                    <img src={Logo} alt='logo' onClick={() => navigate("/")}></img>
                    <span>Clanno</span>
                </li>

                {!user &&    
                    <>   
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/signup">Signup</Link>
                        </li>
                    </>
                }

                {user && 
                    <>     
                    <li>
                        {!isPending && <button className="btn" onClick={logout}>Logout</button>}
                    </li>
                    <li>
                        {isPending && <button className="btn" disabled>Logging out...</button>}
                    </li> 
                </>           
                }
            </ul>
        </div>
    )
}
