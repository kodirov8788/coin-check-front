import React, { useContext, useEffect, useState } from 'react'
import "./TeacherUpdate.css"
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { AuthContext } from '../../context/AuthContext';
import axios from '../../api/api';

function Teacherupdate() {
    const [Name, setName] = useState("")
    const [Username, setUsername] = useState("")
    const [Lastname, setLastname] = useState("")
    const [Number, setNumber] = useState("")

    const teacherid = useParams().id
    const [teacher, setTeacher] = useState([]);

    // const [isLoading, setIsLoading] = useState(false);
    const { setIsLoading, sensor, setSensor } = useContext(AuthContext);
    const { user } = useAuthContext();

    // console.log(teacher);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('/user/getusers', {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            let filtereddata = response.data.filter(teac => teac._id === teacherid)

            setTeacher(filtereddata[0]);
        } catch (error) {
            console.error(error);
            console.log('Error occurred while fetching data');
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [user, sensor]);

    const editTeacher = async () => {
        console.log(teacherid)
        setIsLoading(true)
        setSensor(true)

        let newuser = {
            username: Username,
            name: Name,
            lastname: Lastname,
            number: Number

        }
        await axios.put(`/user/updateuser/${teacherid}`, newuser, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        }).then((res) => {
            console.log(res)
            setIsLoading(false)
            setSensor(false)
        })
            .catch((error) => {
                console.log("error bor")
                setIsLoading(false)
                setSensor(false)
            })
        setName("")
        setLastname("")
        setNumber("")
        setUsername("")

    }
    return (
        <div className='teacher_update'>
            <h1>Teacher Update</h1>

            <div className="teacher_update_container">
                <div className="teacher_update_name">
                    <h2><span>{teacher.username}</span></h2>
                    <input onChange={(e) => setUsername(e.target.value)} type="text" placeholder='usernameni o`zgartirish' />
                    <button onClick={editTeacher}>Jo'natish</button>
                </div>
                <div className="teacher_update_name">
                    <h2><span>{teacher.name}</span></h2>
                    <input onChange={(e) => setName(e.target.value)} type="text" placeholder='ismni o`zgartirish' />
                    <button onClick={editTeacher}>Jo'natish</button>
                </div>
                <div className="teacher_update_name">
                    <h2><span>{teacher.lastname}</span></h2>
                    <input onChange={(e) => setLastname(e.target.value)} type="text" placeholder='familiyani o`zgartirish' />
                    <button onClick={editTeacher}>Jo'natish</button>
                </div>
                <div className="teacher_update_name">
                    <h2><span>{teacher.number}</span></h2>
                    <input onChange={(e) => setNumber(e.target.value)} type="text" placeholder='tel raqamni o`zgartirish' />
                    <button onClick={editTeacher}>Jo'natish</button>
                </div>
            </div>
        </div>
    )
}

export default Teacherupdate