import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useAuthContext } from '../../hooks/useAuthContext'
import axios from '../../api/api'

function List({ newUser }) {
    const { isLoading, setIsLoading, sensor, setSensor } = useContext(AuthContext)
    const [coin, setCoin] = useState()
    console.log(newUser)
    useEffect(() => {

        const getData = async () => {
            setCoin(newUser.coin)
        }
        getData()
    }, [newUser, sensor])
    return (
        <b style={{ color: 'red' }}>{coin}</b>
    )
}

export default List