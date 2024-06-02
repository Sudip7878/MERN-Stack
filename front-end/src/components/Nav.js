import React from "react";
import { Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Nav = () => {
    const navigate = useNavigate()
    const user = localStorage.getItem("user")
    const logout=()=>{
        localStorage.clear()
        navigate('/signup')
    }
    return (
        <div>
            <nav className="nav-bar">
                {user ?
                    <ul>
                        <li><Link className="anker" to="/">Home</Link></li>
                        <li><Link className="anker" to="/add">Add</Link></li>
                        <li><Link className="anker" to="/logout" onClick={logout}>Logout({JSON.parse(user).name})</Link></li>
                    </ul>
                    :
                    <ul className="two li">
                        <li><Link className="anker first" to="/login">Login</Link></li>
                        <li><Link className="anker second" to="/signup">Signup</Link></li>
                    </ul>
                }
            </nav>
        </div>
    );
}

export default Nav;