import React from 'react'
import { Link } from 'react-router-dom'

function Liststudents({ users }) {
    return (
        <li key={users._id} >
            <p className='userlist_name'>
                ismi: <b>{users.name}</b>
            </p>


            <a className='userlist_number' href="tel:998939427899">939427899</a>
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