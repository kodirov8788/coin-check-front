import React, { useContext, useEffect, useState } from 'react'
import "./Teachers.css"
import { AuthContext } from '../../context/AuthContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import Axios from '../../api/api';
import { Link } from 'react-router-dom';
function Teachers() {

    const [data, setData] = useState([]);

    // const [isLoading, setIsLoading] = useState(false);
    const { isLoading, setIsLoading, sensor, setSensor } = useContext(AuthContext);
    const { user } = useAuthContext();
    // console.log(isLoading)
    // console.log(data);

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

    const deleteUser = async (id) => {
        setIsLoading(true);
        setSensor(true)
        try {
            const students = await Axios.get('/auth/get');
            if (students.data.some(use => use.teacherid === id)) {
                alert("bu o`qituvchining o`quvchilari bor")
            } else {
                try {
                    await Axios.delete(`/user/delete/${id}`, {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        },
                    })
                        .then(res => console.log(res.data))
                        .catch(error => console.log(error))
                } catch (error) {
                    console.error(error);
                }
            }
        } catch (error) {
            console.error(error);
            console.log('Error occurred while fetching data');
        }


        // try {
        //     await Axios.delete(`/user/delete/${id}`, {
        //         headers: {
        //             Authorization: `Bearer ${user.token}`,
        //         },
        //     })
        //         .then(res => console.log(res.data))
        //         .catch(error => console.log(error))
        // } catch (error) {
        //     console.error(error);
        // }
        setSensor(false)
        setIsLoading(false);
    }

    return (
        <div className='teacher'>
            <h1>Teacher</h1>
            <div className="teacher_wrap">
                {data.map(teacher => (
                    <li className='teacher_list' key={teacher._id}>
                        <span className='teacher_username'>{teacher.username}</span>
                        {teacher.number ? <a className='teacher_number' href={`tel:+998${teacher.number}`}>{teacher.number}</a> : <></>}



                        {teacher.role === "user" ? <Link to={`/teachers/${teacher._id}`} state={teacher}>o`quvchilarini ko`rish</Link> : ""}

                        <p className='teacher_role'> role:<span >{teacher.role}</span></p>

                        {
                            teacher.role === "user" ? <button className='teacher_delete_btn' onClick={() => deleteUser(teacher._id)}>Delete</button> : <></>
                        }
                        <p className='teacher_subject'> fan:<span >{teacher.subject === "it" ? "dasturlash" : teacher.subject === "eng" ? "english" : teacher.subject === "ru" ? "russion" : ""}</span></p>

                        <Link className='teacher_edit' state={teacher} to={`/teacherupdate/${teacher._id}`}>edit teacher</Link>

                    </li>
                ))}

            </div>
        </div>
    )
}

export default Teachers