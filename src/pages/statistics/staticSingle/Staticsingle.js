import React, { useContext, useEffect, useState } from 'react'
import "./Staticsingle.css"
import { AuthContext } from '../../../context/AuthContext';
import { useAuthContext } from '../../../hooks/useAuthContext';
import axios from '../../../api/api';
function Staticsingle({ userdata }) {

    const { isLoading, setIsLoading, sensor, setSensor } = useContext(AuthContext)
    const [teacher, setTeacher] = useState({})
    // console.log(teacher)
    const { user } = useAuthContext()

    // console.log("userdata :", userdata)
    useEffect(() => {
        const fetchData = async () => {
            // setIsLoading(true);
            setSensor(true)
            await axios.get(`/user/getsingle/${userdata.teacherid}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            }).then(res => {
                setTeacher(res?.data)
                setSensor(false)

                // setIsLoading(false)
            })
                .catch(err => {
                    setIsLoading(false)
                    // console.log(err)
                    setSensor(false)
                })
        };
        fetchData();
    }, [user, sensor]);

    // console.log(teacher)



    return (
        <div className='staticsingle'>
            <div className="staticsingle_left">
                <h2>ismi:</h2>
                <h2>coin : </h2>
                <h2>Fani</h2>
                <h2>Telefon:</h2>
                <h2>O'qituvchisi :</h2>
            </div>
            <div className="staticsingle_right">
                <h2>{userdata?.name}</h2>
                <h2><span>{userdata.coin}</span></h2>
                <h2>{userdata?.subject?.toUpperCase()}</h2>
                <h2><a href={`tel:+998${userdata?.number}`}>{userdata?.number}</a></h2>
                <h2>{teacher?.name ? teacher.name : "ismi chiqmadi"}</h2>
            </div>


        </div>
    )
}

export default Staticsingle