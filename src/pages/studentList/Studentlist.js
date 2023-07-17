import React, { useContext, useEffect, useState } from 'react';
import './Studentlist.css';
import Axios from '../../api/api';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import Liststudents from './Liststudents';

function Studentlist() {
    const [Data, setData] = useState([]);
    // console.log(Data)
    const [weekdays, setWeekday] = useState("");
    const [lessonTime, setLessonTime] = useState("");
    const [filteredData, setFilteredData] = useState([]);

    const { isLoading, setIsLoading, sensor, setSensor } = useContext(AuthContext);
    const { user } = useAuthContext();
    // console.log(filteredData)
    const fetchData = async () => {
        setIsLoading(true);

        try {
            const { data } = await Axios.get('/auth/get', {
                headers: {
                    Authorization: `Bearer ${user?.token}`,
                },
            });

            if (user.role === "root") {
                setData(data)
            } else {
                setData(data.filter(use => use.teacherid === user.id));
            }
        } catch (error) {
            console.error(error);
            console.log('Error occurred while fetching data');
        }
        setIsLoading(false);


    };

    const sendForm = (e) => {
        e.preventDefault();
        setIsLoading(true)
        // console.log("ishladi")
        setTimeout(async () => {
            if (user.role === "root") {
                if (weekdays && lessonTime) {
                    let filt = Data.filter((use) => {
                        return use.weekday === weekdays && use.time === lessonTime
                    });
                    setFilteredData(filt)
                } else if (weekdays && !lessonTime) {
                    let filt = Data.filter((use) => {
                        // console.log("dasdsa")
                        return use.weekday === weekdays
                    });
                    setFilteredData(filt)
                } else if (lessonTime && !weekdays) {
                    let filt = Data.filter((use) => {
                        return use.time === lessonTime
                    });
                    setFilteredData(filt)
                } else {
                    setFilteredData(Data)
                }
            } else {
                if (weekdays && lessonTime) {
                    let filt = Data.filter((use) => {
                        return use.weekday === weekdays && use.time === lessonTime
                    });
                    setFilteredData(filt)
                } else if (weekdays && !lessonTime) {
                    let filt = Data.filter((use) => {
                        return use.weekday === weekdays
                    });
                    setFilteredData(filt)
                } else if (lessonTime && !weekdays) {
                    let filt = Data.filter((use) => {
                        return use.time === lessonTime
                    });
                    setFilteredData(filt)
                } else {
                    setFilteredData(Data)
                }
            }



            setIsLoading(false)
        }, 500)
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
                    <div class="radio-group" onChange={(e) => setWeekday(e.target.value)} required>
                        <input type="radio" value={"odd"} id="option-one" name="selector" />
                        <label for="option-one">Toq</label>
                        <input type="radio" value={"even"} id="option-two" name="selector" />
                        <label for="option-two" >Juft</label>
                    </div>
                    <select onChange={(e) => (setLessonTime(e.target.value))}>
                        <option value="">all</option>
                        <option value="8-10">8-10</option>
                        <option value="10-12">10-12</option>
                        <option value="14-16">14-16</option>
                        <option value="16-18">16-18</option>
                    </select>

                </div>
                <button>Qidiruv</button>
            </form >
            {
                user.role === "root" ?
                    < div className='userlist'>
                        <div className="userlist_student_count">
                            <h1 style={{ textAlign: "center" }}>O`quvchilar ro`yhati.</h1>
                            {Data.length === 0 ? (
                                <></>
                            ) : (
                                <h1>Sizning <span>{Data.length}</span>ta o'quvchingiz bor</h1>
                            )}
                            {filteredData.length === 0 ? (
                                <></>
                            ) : (
                                <h1>sizning <span>{Data.length}</span>ta o'quvchingiz bor</h1>
                            )}

                        </div>
                        {Data.length === 0 ? (
                            <h1>loading...</h1>
                        ) : (
                            <div className="list_collection">
                                {weekdays || lessonTime ?
                                    filteredData.map((userl) => (
                                        <Liststudents key={userl._id} users={userl} />
                                    )) :
                                    Data.map((userl) => (
                                        <Liststudents key={userl._id} users={userl} />
                                    ))
                                }
                            </div>
                        )}
                    </div >
                    :
                    <div className='userlist'>
                        <div className="userlist_student_count">
                            <h1 style={{ textAlign: "center" }}>O`quvchilar ro`yhati.</h1>

                            {filteredData.length === 0 ? (
                                <h1> Sizning <span>{Data.length}</span>ta o'quvchingiz bor</h1>
                            ) : (
                                <h1>Sizning <span>{filteredData.length}</span>ta o'quvchingiz bor</h1>
                            )}
                        </div>


                        {Data.length === 0 ? (
                            <h1>loading...</h1>
                        ) : (
                            <div className="list_collection">
                                {weekdays || lessonTime ?
                                    filteredData.map((userl) => (
                                        <Liststudents key={userl._id} users={userl} />
                                    )) :
                                    Data.map((userl) => (
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
