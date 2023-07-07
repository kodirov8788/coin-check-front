import React, { useContext, useEffect, useState } from 'react';
import './Userslist.css';
import Axios from '../../api/api';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useAuthContext } from '../../hooks/useAuthContext';

function Userslist() {
    const [data, setData] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const { setIsLoading: setContextIsLoading, sensor, setSensor } = useContext(AuthContext);
    const { user } = useAuthContext();

    console.log(data);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await Axios.get('/client/get', {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            let filteredData = response.data.filter(student => student.teacher === user.username)
            setData(filteredData);
        } catch (error) {
            console.error(error);
            console.log('Error occurred while fetching data');
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [user, sensor]);



    return (
        <div className='userlist'>
            <h1>O`quvchilar ro`yhati</h1>
            {data.length === 0 ? (
                <h1>loading...</h1>
            ) : (
                <div className="list_collection">
                    {
                        data.map((user) => (
                            <li key={user._id} >
                                <p className='userlist_name'>
                                    ismi: <b>{user.name}</b>
                                </p>
                                <p className='userlist_time'>{user.time}</p>
                                <a href="tel:+998939427899">9939427899</a>
                                <p className='userlist_coin'>
                                    yig`gan coin miqdori: <b style={{ color: 'red' }}>{user.coin}</b>
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
    );
}

export default Userslist;
