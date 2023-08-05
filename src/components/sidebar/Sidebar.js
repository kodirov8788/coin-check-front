import React from 'react'
import Menu from "./close-button-svgrepo-com.svg"
import "./Sidebar.css"
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';

function Sidebar({ sidebarstate, sidebarOpen }) {
    const { user, dispatch } = useAuthContext();

    const logout = () => {
        localStorage.removeItem('user')
        dispatch({ type: 'LOGOUT' })
    }

    const handleClick = () => {
        logout();
    };
    return (
        <div className='sidebar' style={sidebarOpen ? { transform: "translateX(0)" } : { transform: "translateX(-2000px)" }}>
            <button className='sidebar_open' onClick={() => sidebarstate(false)}>
                <img src={Menu} alt="" />
            </button>

            <div className="sidebar_route">

                {user?.role === "root" ?
                    <div className='sidebar_link'>
                        <Link to="/signup">Teacher qo`shish</Link>
                        {/* <Link to="/archives">archives</Link>
                        <Link to="/admin">admin</Link> */}
                        <Link to="/teachers">Teacher</Link>

                    </div>
                    : <div className='sidebar_link'>
                        <Link to="/addstudent">O`quvchini qo`shish</Link>
                        <Link to="/studentlist">Student list</Link>
                        <Link to="/searchstudent">O`quvchini qidirish</Link>
                        <Link to="/statistics">Statistika</Link>

                    </div>
                }
                {user ? (
                    <div>
                        <span>{user.email}</span>
                        <button className='sidebar_logout' onClick={handleClick}>Log out</button>

                    </div>
                ) : <Link to="/login">Login</Link>
                }
            </div>
        </div>
    )
}

export default Sidebar