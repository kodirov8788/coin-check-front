import React, { useContext, useEffect, useState } from 'react'
import "./Teachers.css"
import { AuthContext } from '../../context/AuthContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import Axios from '../../api/api';
import { Link } from 'react-router-dom';
function Teachers() {

    const [data, setData] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const { setIsLoading: setContextIsLoading, sensor, setSensor } = useContext(AuthContext);
    const { user } = useAuthContext();

    console.log(data);

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
            console.log('Error occurred while fetching data');
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
                    <li className='teacher_list' key={teacher._id}>
                        <span className='teacher_username'>{teacher.username}</span>
                        <Link to={`/teachers/${teacher._id}`} state={teacher}>o`quvchilarini ko`rish</Link>
                        <p className='teacher_role'> role:<span >{teacher.role}</span></p>

                    </li>
                ))}

            </div>
        </div>
    )
}

export default Teachers