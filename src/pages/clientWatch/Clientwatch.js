import React, { useContext, useEffect, useState } from 'react'
import "./Clientwatch.css"
import Liststudents from '../studentList/Liststudents'
import { useAuthContext } from '../../hooks/useAuthContext';
import { AuthContext } from '../../context/AuthContext';
import Axios from '../../api/api';
import { Link } from 'react-router-dom';
function Clientwatch() {
    const [Data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [number, setNumber] = useState("");
    const { setIsLoading } = useContext(AuthContext);
    console.log(Data)


    const fetchData = async (e) => {
        e.preventDefault()
        setIsLoading(true);

        try {
            const { data } = await Axios.post('/auth/result', { number: number });
            // setData(data.filter(user => user.number == number));
            setData(data)

            setIsLoading(false);

        } catch (error) {
            // console.error(error);
            setIsLoading(false);

            // console.log('Error occurred while fetching data');
        }

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

    }, [Data])

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
            <form className='client_form' onSubmit={fetchData}>
                <h1>Nomer orqali qidiring!</h1>
                <div className="client_watch">
                    <p>+998</p>
                    <input onChange={(e) => setNumber(e.target.value)} type="number" placeholder='raqamingizni kiriting' required />

                </div>
                <button>ko`rish</button>

            </form>

            {
                Data.length < 1 ? <></> :
                    < h1 > Sizdagi tangalar miqdor: <span>{total}</span> </h1>
            }
            {
                Data.map(user => (
                    <Listuser key={user._id} user={user} />
                ))
            }
        </div >
    )
}

export default Clientwatch