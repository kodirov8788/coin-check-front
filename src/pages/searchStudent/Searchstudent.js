import React, { useContext, useEffect, useState } from 'react';
import './Searchstudent.css';
import Axios from '../../api/api';
import { AuthContext } from '../../context/AuthContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import Liststudents from '../studentList/Liststudents';

function Searchstudent() {
    const [Data, setData] = useState([]);

    const [inputSearch, setInputSearch] = useState("");

    const [filteredData, setFilteredData] = useState([]);
    const { setIsLoading, sensor } = useContext(AuthContext);
    const { user } = useAuthContext();
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
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
            console.log('Error occurred while fetching data');
        }


    };

    useEffect(() => {
        fetchData();

        setFilteredData(Data.filter(us => (us.name.toLowerCase() + us.lastname.toLowerCase()).includes(inputSearch.toLowerCase())))
    }, [user, sensor, inputSearch]);




    return (
        <>
            <input className='searchstudent_input' placeholder='Ism va Familiya orqali qidiring...' type="text" onChange={(e) => setInputSearch(e.target.value)} />

            {
                user?.role === "root" ?
                    < div className='userlist'>
                        <div className="userlist_student_count">
                            <h1 style={{ textAlign: "center" }}>O`quvchilar ro`yhati.</h1>
                            {Data.length === 0 ? (
                                <></>
                            ) : (
                                <h1>Sizning <span>{Data.length}</span>ta o'quvchingiz bor</h1>
                            )}
                            {inputSearch === "" ? (
                                <></>
                            ) : (
                                <h1>natija: <span>{Data.length}</span>ta o'quvchi bor</h1>
                            )}

                        </div>
                        {Data.length === 0 ? (
                            <h1>loading...</h1>
                        ) : (
                            <div className="list_collection">
                                {inputSearch !== "" ?
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

                            {inputSearch === "" ? (
                                <h1> Sizning <span>{Data.length}</span>ta o'quvchingiz bor</h1>
                            ) : (
                                <h1>Natija: <span>{filteredData.length}</span>ta o'quvchi bor</h1>
                            )}
                        </div>


                        {Data.length === 0 ? (
                            <h1>loading...</h1>
                        ) : (
                            <div className="list_collection">
                                {inputSearch !== "" ?
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



export default Searchstudent