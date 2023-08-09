import axios from '../../api/api'
import React from 'react'
function ListItems({ archivelist }) {

    // console.log(archivelist)
    return (
        <li>
            <span>{archivelist.archive.name}</span> <span>{archivelist.archive.qarz}</span><a href={`tel:+998${archivelist.archive.number}`}>{archivelist.archive.number}</a>


        </li>
    )
}

export default ListItems