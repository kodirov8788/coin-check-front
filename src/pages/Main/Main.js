import React from 'react'
import { Link } from 'react-router-dom'
import "./Main.css"
import { useAuthContext } from '../../hooks/useAuthContext'
import Studentlist from '../studentList/Studentlist'
function Main() {
    const { user } = useAuthContext()
    // console.log(user)
    return (
        <div className='main'>

            {user?.role === "root" ? <>
                <h1>Admin page</h1>

                <div className="main_wrap">
                    <Link to={"/teachers"}>Teacherlar ro`yhati</Link>
                    <Link to={"/studentlist"}>O`quvchilar ro`yhati</Link>
                </div>
            </> :
                <Studentlist />
            }


        </div>
    )
}

export default Main