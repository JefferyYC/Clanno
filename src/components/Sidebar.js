import { NavLink } from "react-router-dom"
import Avatar from "./Avatar"

// styles & images
import "./Sidebar.css"
import DashboardIcon from '../assets/dashboard_icon.svg'
import AddIcon from '../assets/add_icon.svg'

import { useAuthContext } from "../hooks/useAuthContext"

// hardcoded avatar icon
import AvatarIcon from '../assets/avatar_male.svg'

export default function Sidebar() {
    const { user } = useAuthContext()

    return (
    <div className="sidebar">
        <div className="sidebar-content">
        <div className="user">
            {/* avatar & username here later */}
            <Avatar src={AvatarIcon}/>
            {user && <p>Hello!</p>}
            {user && <p>{user.displayName}</p>}
            {!user && <p> Log In Now! </p>}
        </div>  
        <nav className="links">
            <ul>
            <li>
                <NavLink to="/">
                <img src={DashboardIcon} alt="dashboard icon" />
                <span>Clanno Home</span>
                </NavLink>
            </li>
            <li>
                <NavLink to="/survey">
                <img src={AddIcon} alt="add survey icon" />
                <span>Clanno Survey</span>
                </NavLink>
            </li>
            <li>
                <NavLink to="/news">
                <img src={AddIcon} alt="view newsletter icon" />
                <span>Clanno Newsletter</span>
                </NavLink>
            </li>
            </ul>
        </nav>
        </div>
    </div>
    )
}