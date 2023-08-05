import React, { useContext, useEffect, useState } from 'react'
import "./Statistics.css"
import Liststudents from '../studentList/Liststudents'
import { useAuthContext } from '../../hooks/useAuthContext';
import { AuthContext } from '../../context/AuthContext';
import Axios from '../../api/api';
import { Link } from 'react-router-dom';
function Statistics() {
    const [Data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [number, setNumber] = useState("");
    const { isLoading, setIsLoading, sensor, setSensor } = useContext(AuthContext);

    const fetchData = async (e) => {
        // e.preventDefault()
        setIsLoading(true);

        try {
            const { data } = await Axios.get('/auth/get');
            let sorted = data.sort((a, b) => b.coin - a.coin)
            setData(sorted);
        } catch (error) {
            console.error(error);
            console.log('Error occurred while fetching data');
        }
        setIsLoading(false);

    };

    useEffect(() => {
        const totalCoin = () => {
            let box = []
            Data.forEach(user => box.push(user.coin))

            setTotal(box.reduce((a, b) => a + b, 0))
        }
        if (Data.length) {
            totalCoin()
        } else {
            setTotal(0)
        }
        fetchData()
    }, [])

    const Listuser = (user) => {
        // console.log(user)

        let newuser = {
            name: user.user.name,
            lastname: user.user.lastname,
            coin: user.user.coin,
            number: user.user.number,
            subject: user.user.subject,
            weekday: user.user.weekday,
        }
        // console.log(newuser)

        return <Liststudents totalstudent={Data.length} users={newuser} />
    }

    return (
        <div className="client">
            <Link to={"/login"}>Loginga qaytish</Link>
            <h1>Statistika</h1>
            {
                Data.map(user => (
                    <Listuser key={user._id} user={user} />
                ))
            }
        </div >
    )
}

export default Statistics