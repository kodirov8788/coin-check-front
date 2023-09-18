import React from 'react'

function Tablechild({ arraydata, inx }) {

    return (

        < tr >
            <td>{inx + 1}</td>
            <td>{arraydata?.user[0].name}</td>
            <td>{arraydata?.user[0].lastname}</td>
            {/* <td><a href={`tel:+998${arraydata?.user[0].number}`}>{arraydata?.user[0].number}</a></td> */}
            <td><b>{arraydata?.allCoin}</b></td>
            <td>
                {arraydata?.user[0].subject?.toUpperCase()}{arraydata?.user[1]?.subject ? `, ${arraydata?.user[1]?.subject?.toUpperCase()}` : ""}{arraydata?.user[2]?.subject ? `, ${arraydata?.user[2]?.subject?.toUpperCase()}` : ""}
            </td>

        </tr >

    )
}

export default Tablechild