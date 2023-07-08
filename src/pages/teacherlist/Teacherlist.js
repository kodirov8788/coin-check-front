import React, { useContext, useEffect, useState } from 'react'
import "./Teacherlist.css"
import { Link, useLocation } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import axios from '../../api/api';
function Teacherlist() {
    const teachers = useLocation().state
    const [data, setData] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const { setIsLoading: setContextIsLoading, sensor, setSensor } = useContext(AuthContext);
    const { user } = useAuthContext();

    // console.log(data);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('/client/get', {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            let filtereddata = response.data.filter(student => student.teacherid === teachers.id)

            setData(filtereddata);
        } catch (error) {
            console.error(error);
            console.log('Error occurred while fetching data');
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [user, sensor]);

    // console.log(teachers)
    return (
        <div className='userlist'>
            <h1>User lists</h1>
            {data.length === 0 ? (
                <h1>loading...</h1>
            ) : (
                <div className="list_collection">
                    {data.map((user) => (
                        <li key={user._id} >
                            <p className='userlist_name'>
                                ismi: <b>{user.name}</b>
                            </p>
                            <p className='userlist_time'>{user.time}</p>
                            <a href={`tel:+998${user?.number}`}>{user.number ? user.number : "nomer yo'q"}</a>
                            <p className='userlist_coin'>
                                coin : <b style={{ color: 'red' }}>{user.coin}</b>
                            </p>
                            <Link className='link' to={`/debt/${user._id}`}>
                                Taxrirlash
                            </Link>

                        </li>
                    ))
                    }
                </div>
            )}
        </div>
    )
}

export default Teacherlist