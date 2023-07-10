import React, { useContext, useEffect, useState } from 'react';
import './Userslist.css';
import Axios from '../../api/api';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import Liststudents from '../../pages/studentList/Liststudents';

function Userslist() {
    const [data, setData] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const { setIsLoading: setContextIsLoading, sensor, setSensor } = useContext(AuthContext);
    const { user } = useAuthContext();

    console.log(data);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await Axios.get('/auth/get', {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            let filteredData = response.data.filter(student => student.teacherid === user.id)
            setData(filteredData);
        } catch (error) {
            console.log(error);
            // console.log('Error occurred while fetching data');
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
                <div className="user_collection">
                    {
                        data.map((user) => (
                            <Liststudents key={user._id} users={user} />
                        ))
                    }
                </div>
            )}
        </div>
    );
}

export default Userslist;
