import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import Menu from "./menu-svgrepo-com (2).svg"
import './Header.css';
import Sidebar from "../sidebar/Sidebar.js"
const Header = () => {
    const location = useLocation().pathname
    const { user, dispatch } = useAuthContext();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    console.log(sidebarOpen)
    const logout = () => {
        localStorage.removeItem('user')
        dispatch({ type: 'LOGOUT' })
    }

    const handleClick = () => {
        logout();
    };

    useEffect(() => {
        const sense = () => {
            setSidebarOpen(false)
        }

        sense()
    }, [location])

    return (
        <header>
            <Sidebar sidebarOpen={sidebarOpen} sidebarstate={setSidebarOpen} />
            <button className='header_menu' onClick={() => setSidebarOpen(true)}>
                <img src={Menu} alt="" />
            </button>
            <div className="container">
                <Link to="/">
                    <h1>Coin list</h1>
                </Link>
                <div className="header_media_wrap">{
                    user ?
                        <h1>username: <span>{user.username}</span> </h1> : <></>
                }


                    {user?.role === "root" ?
                        <div className='admin_link'>
                            <Link to="/signup">Teacher qo`shish</Link>
                            {/* <Link to="/archives">archives</Link>
                            <Link to="/admin">admin</Link> */}
                            <Link to="/teachers">Teacher</Link>

                        </div>
                        : <div className='admin_link'>
                            <Link to="/addstudent">O`quvchini qo`shish</Link>
                            <Link to="/studentlist">Student list</Link>
                        </div>
                    }
                    {user ? (
                        <button className='header_logout' onClick={handleClick}>Log out</button>

                    ) : (
                        <Link to="/login">Login</Link>
                    )}
                </div>

            </div>
        </header>
    );
};

export default Header;
