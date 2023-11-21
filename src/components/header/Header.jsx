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
    const [userHidden, setUserHidden] = useState(false);


    const change = () => {
        setUserHidden(true)

        setTimeout(() => {
            setUserHidden(false)
        }, 3000);
    }





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
        <header style={location === "/table" ? { display: 'none' } : { display: 'block' }}>
            <Sidebar sidebarOpen={sidebarOpen} sidebarstate={setSidebarOpen} />
            <button className='header_menu' onClick={() => setSidebarOpen(true)}>
                <img src={Menu} alt="" />
            </button>
            <div className="container">
                <Link className='header_logo' to="/">
                    Coin list
                </Link>
                <div className="header_media_wrap">{
                    user ?
                        <h1 onClick={() => change()}>username: {userHidden ? <span>{user.username}</span> : <span className='header_userhidden'><small>*******</small></span>} </h1> : <></>
                }


                    {user?.role === "root" ?
                        <div className='admin_link'>
                            <Link to="/signup">Teacher qo`shish</Link>
                            {/* <Link to="/archives">archives</Link> */}
                            {/* <Link to="/admin">admin</Link> */}
                            <Link to="/teachers">Teacher</Link>
                            <Link to="/statistics">Statistika</Link>
                            <Link to="/searchstudent">O`quvchini qidirish</Link>
                            <Link to="/table">Table</Link>


                        </div>
                        : <div className='admin_link'>
                            <Link to="/addstudent">O`quvchini qo`shish</Link>
                            <Link to="/searchstudent">O`quvchini qidirish</Link>
                            <Link to="/studentlist">Student list</Link>
                            <Link to="/statistics">Statistika</Link>

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
