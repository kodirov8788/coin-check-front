import axios from '../../api/api';
import React, { useContext, useEffect, useState } from 'react'
import Staticsingle from './staticSingle/Staticsingle';

function Staticchild({ arraydata }) {
    // console.log(arraydata)
    // const [total, setTotal] = useState()
    // console.log(total)

    // console.log(arraydata)
    // useEffect(() => {
    //     const totalCoin = () => {
    //         let box = []
    //         arraydata?.forEach(user => box.push(user.coin))

    //         setTotal(box.reduce((a, b) => a + b, 0))
    //     }
    //     if (arraydata?.length) {
    //         totalCoin()
    //     } else {
    //         setTotal(0)
    //     }
    // }, [arraydata])


    return (
        <div className='static_child'>
            <div className="static_child_title">
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