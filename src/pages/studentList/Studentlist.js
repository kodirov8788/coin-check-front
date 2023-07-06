import React, { useContext, useEffect, useState } from 'react';
import './Studentlist.css';
import Axios from '../../api/api';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import Liststudents from './Liststudents';

function Studentlist() {
    const [Data, setData] = useState([]);
    const [weekdays, setWeekday] = useState("");
    const [lessonTime, setLessonTime] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { setIsLoading: setContextIsLoading, sensor, setSensor } = useContext(AuthContext);
    const { user } = useAuthContext();
    console.log(filteredData)
    console.log(Data)
    const fetchData = async () => {
        setIsLoading(true);
        try {
            const { data } = await Axios.get('/client/get', {
                headers: {
                    Authorization: `Bearer ${user?.token}`,
                },
            });
            setData(data);
        } catch (error) {
            console.error(error);
            console.log('Error occurred while fetching data');
        }
        setIsLoading(false);
    };

    const sendForm = async (e) => {
        e.preventDefault();
        setIsLoading(true)


        if (user.role === "root") {
            let filt = Data.filter((use) => {
                return use.weekday === weekdays && use.time === lessonTime
            });

            setFilteredData(filt)
        } else {
            let filt = Data.filter((use) => {
                return use.weekday === weekdays && use.time === lessonTime && use.teacher === user.username;
            });

            setFilteredData(filt)
        }



        setIsLoading(false)
    };

    useEffect(() => {
        fetchData();
    }, [user, sensor]);



    return (
        <>
            <form className="studentlist_form" action="" onSubmit={sendForm}>
                <div className="form_text">
                    <h3>Dars kuni va vaqtini tanglang!</h3>
                </div>
                <div className="studentlist_inputs">
                    <select onChange={(e) => setWeekday(e.target.value)} >
                        <option value="">hafta kunini tanglang</option>
                        <option value="odd">toq kunlar</option>
                        <option value="even">juft kunlar</option>
                    </select>
                    <select onChange={(e) => setLessonTime(e.target.value)}>
                        <option value="">all</option>
                        <option value="8-10">8-10</option>
                        <option value="10-12">10-12</option>
                        <option value="14-16">14-16</option>
                        <option value="16-18">16-18</option>
                    </select>

                </div>
                <button>Qo'shish</button>
            </form>
            {user.role === "root" ?
                < div className='userlist'>
                    <h2>O`quvchilar ro`yhati</h2>
                    {Data.length === 0 ? (
                        <h1>loading...</h1>
                    ) : (
                        <div className="list_collection">
                            {!weekdays || !lessonTime ?
                                Data.map((userl) => (
                                    <Liststudents key={userl._id} users={userl} />
                                )) :
                                filteredData.map((userl) => (
                                    <Liststudents key={userl._id} users={userl} />
                                ))
                            }
                        </div>
                    )}
                </div >
                :
                <div className='userlist'>
                    <h2>O`quvchilar ro`yhati</h2>
                    {filteredData.length === 0 ? (
                        <h1>loading...</h1>
                    ) : (
                        <div className="list_collection">
                            {filteredData.map((userl) => (
                                <Liststudents key={userl._id} users={userl} />
                            ))
                            }
                        </div>
                    )}
                </div>
            }

        </>
    );
}

export default Studentlist;
