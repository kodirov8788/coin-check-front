import React from 'react'
import { Link } from 'react-router-dom'

function Liststudents({ users }) {
    return (
        <li key={users._id} >

            <p className='userlist_name'>
                ismi: <b>{users.name}</b>
            </p>

            <p className='userlist_time'>{users.time}</p>

            <a className='userlist_number' href={`tel:998${users?.number}`}>{users.number ? users.number : "nomer yo'q"}</a>
            <p className='userlist_coin'>

                coin miqdori: <b style={{ color: 'red' }}>{users.coin}</b>
            </p>
            <Link className='link' to={`/debt/${users._id}`}>
                Taxrirlash
            </Link>

        </li>
    )
}

export default Liststudents