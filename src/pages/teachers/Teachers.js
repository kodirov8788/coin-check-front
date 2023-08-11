import React, { useContext, useEffect, useState } from 'react'
import "./Teachers.css"
import { AuthContext } from '../../context/AuthContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import Axios from '../../api/api';
import { Link } from 'react-router-dom';
import TeacherListItem from './TeacherListItem';

function Teachers() {

    const [data, setData] = useState([]);
    const { setIsLoading, sensor, setSensor } = useContext(AuthContext);
    const { user } = useAuthContext();
    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await Axios.get('/user/getusers', {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });

            setData(response.data);
        } catch (error) {
            console.error(error);
            // console.log('Error occurred while fetching data');
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [user, sensor]);



    return (
        <div className='teacher'>
            <h1>Teacher</h1>
            <div className="teacher_wrap">

                {data.map(teacher => (
                    <TeacherListItem key={teacher._id} teacher={teacher} />

                ))}

            </div>
        </div>
    )
}

export default Teachers