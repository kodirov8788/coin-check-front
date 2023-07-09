import React from 'react'
import { Link } from 'react-router-dom'

function Liststudents({ users }) {
    return (
        <li key={users._id} className='user_list_item'>

            <p className='userlist_name'>
                <b>{users.name}</b>
            </p>
            <p className='userlist_lastname'>
                <b>{users.lastname ? users.lastname : "Familiya yo`q"}</b>
            </p>

            <p className='userlist_weekday'>{users.weekday === "odd" ? "toq" : "juft"} kunlari</p>
            <p className='userlist_time'>{users.time}</p>

            <a className='userlist_number' href={`tel:998${users?.number}`}>{users.number ? users.number : "nomer yo'q"}</a>

            <p className='userlist_coin'>
                <b style={{ color: 'red' }}>{users.coin}</b>
            </p>
            {
                users._id ? <Link className='user_list_link' to={`/debt/${users._id}`}>
                    Taxrirlash
                </Link> : <></>
            }
            <p className='userlist_subject'>
                {users?.subject ? "dasturlash" : ""}
            </p>


        </li>
    )
}

export default Liststudents