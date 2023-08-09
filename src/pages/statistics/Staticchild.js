import React from 'react'
import Staticsingle from './staticSingle/Staticsingle';

function Staticchild({ arraydata, inx }) {

    // console.log("staticchild :", arraydata.user)



    return (
        <div className='static_child'>

            <div className="static_child_title">
                <h1>{inx + 1}</h1>
                <h2> To'plangan coin : <span>{arraydata?.allCoin}</span></h2>
                <h2><a href={`tel:${arraydata?.user[0].number}`}>{arraydata?.user[0].number}</a></h2>
            </div>
            {arraydata?.user.map((arr, index) => (
                <Staticsingle key={index} userdata={arr} />
            ))}
        </div>
    )
}

export default Staticchild