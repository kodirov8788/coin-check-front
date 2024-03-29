import React, { useContext, useEffect, useState } from 'react'
import "./Teacherlist.css"
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import axios from '../../api/api';
import Liststudents from '../studentList/Liststudents';
function Teacherlist() {
    const teachers = useParams().id
    const [data, setData] = useState([]);
    console.log(data)
    const { setIsLoading, sensor } = useContext(AuthContext);
    const { user } = useAuthContext();
    // console.log(teachers)
    // console.log(data);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('/auth/get');
            let filtereddata = response.data.filter(student => student.teacherid === teachers)
            // console.log(response)
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
            <h1>o`quvchilar soni <span className='student_count'>{data.length}</span></h1>
            {data.length === 0 ? (
                <h1>loading...</h1>
            ) : (
                <div className="list_collection">
                    {data.map((user) => (
                        <Liststudents key={user._id} totalstudent={data.length} users={user} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Teacherlist