import { Link, useNavigate } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

//styles
import './Navbar.css'
import Temple from '../assets/pillow.svg'

export default function Navbar() {
    const navigate = useNavigate()
    const { logout, isPending } = useLogout()
    const { user } = useAuthContext()

    return (
        <div className="navbar">
            <ul>
                <li className='logo'>
                    <img src={Temple} alt='logo' onClick={() => navigate("/")}></img>
                    <span>Pillow</span>
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
