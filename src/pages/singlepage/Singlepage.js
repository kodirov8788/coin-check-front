import React, { useState, useEffect, useContext } from 'react'
import "./Singlepage.css"
import Axios from '../../api/api'
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from '../../context/AuthContext'
import { useAuthContext } from '../../hooks/useAuthContext'
import { toast } from 'react-toastify';

function Singlepage() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [Name, setName] = useState("")
    const [Lastname, setLastname] = useState("")
    const [NumberInput, setNumberInput] = useState("")
    const [weekdays, setWeekday] = useState("");
    const [lessonTime, setLessonTime] = useState("");
    const [teacherId, setTeacherId] = useState("");
    // console.log(teacher)
    // console.log(lessonTime)
    const { setIsLoading, sensor, setSensor } = useContext(AuthContext)
    const { user } = useAuthContext()
    const [ayiruvQiymat, setAyiruvQiymat] = useState("")
    // const [qoshuvQiymat, setQoshuvQiymat] = useState("")
    const [clientEdit, setClientEdit] = useState(false)
    const [userData, setUserData] = useState([])
    const [teacherData, setTeacherData] = useState([])
    // console.log(teacherData)
    // console.log(clientEdit)
    // console.log(userData)
    const getApi = () => {
        setIsLoading(true)
        if (user) {

            const getClientApi = async () => {
                await Axios.get(`/client/getsingle/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                    .then((res) => {
                        setUserData(res.data)
                        setIsLoading(false)
                    })
                    .catch((error) => {
                        toast.error("error bor", {
                            position: toast.POSITION.TOP_RIGHT
                        })
                    })
            }
            const getTeachersApi = async () => {
                await Axios.get("/user/getusers", {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                    .then((res) => {
                        setTeacherData(res.data.filter(el => el.role != "root"))
                        setIsLoading(false)
                    })
                    .catch((error) => {
                        toast.error("error bor", {
                            position: toast.POSITION.TOP_RIGHT
                        })
                    })
            }

            setTimeout(async () => {
                getClientApi()
                getTeachersApi()
            }, 1000);

        }

    }

    useEffect(() => {
        getApi()
    }, [user, sensor])


    const ayirish = async () => {
        setSensor(false)
        setIsLoading(true)
        await Axios.put(`/client/minus/${id}`, { coin: ayiruvQiymat }, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
            .then(res => {
                toast.success(res.data, {
                    position: toast.POSITION.TOP_RIGHT
                });
                setIsLoading(false)
                setSensor(true)
                // console.log(res)
                setAyiruvQiymat(0)
            })
            .catch((error) => {
                // console.log("error bor", error)
                setIsLoading(false)
                setSensor(true)
                toast.error(error, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
            )



    }


    // const reset = async () => {
    //     // return console.log("coin: ", (userData.coin - userData.coin))
    //     setSensor(false)
    //     setIsLoading(true)
    //     await Axios.put(`/client/minus/${id}`, { coin: userData.coin }, {
    //         headers: {
    //             'Authorization': `Bearer ${user.token}`
    //         }
    //     })
    //         .then(res => {
    //             toast.success(res.data, {
    //                 position: toast.POSITION.TOP_RIGHT
    //             });
    //             setIsLoading(false)
    //             setSensor(true)
    //             // console.log(res)
    //             setAyiruvQiymat(0)
    //         })
    //         .catch((error) => {
    //             // console.log("error bor", error)
    //             setIsLoading(false)
    //             setSensor(true)
    //             toast.error(error, {
    //                 position: toast.POSITION.TOP_RIGHT
    //             });
    //         })



    // }
    // const qoshish = async () => {
    //     setSensor(false)
    //     setIsLoading(true)
    //     await Axios.put(`/client/plus/${id}`, { coin: qoshuvQiymat }, {
    //         headers: {
    //             'Authorization': `Bearer ${user.token}`
    //         }
    //     })
    //         .then(res => console.log(res))
    //         .catch((error) => console.log("error bor", error))
    //     setIsLoading(false)
    //     setSensor(true)
    //     setQoshuvQiymat(0)
    //     setAyiruvQiymat(0)
    // }
    const deleteUser = async (id) => {
        try {
            const response = await Axios.delete(`/client/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            toast.success(response.data, {
                position: toast.POSITION.TOP_RIGHT
            });
            setIsLoading(false);
            setSensor(true)
            navigate(-1)
        } catch (error) {
            console.error(error);
            toast.error(error, {
                position: toast.POSITION.TOP_RIGHT
            });
            setIsLoading(false);
            setSensor(true)
            // console.log('Error occurred while deleting user');
        }

    };

    const editClient = async () => {
        // console.log(id)
        setIsLoading(true)
        setSensor(true)

        let newuser = {
            name: Name,
            lastname: Lastname,
            number: NumberInput,
            weekday: weekdays,
            time: lessonTime,
            teacherid: teacherId
        }
        await Axios.put(`/client/update/${id}`, newuser, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        }).then((res) => {
            // console.log(res)
            setIsLoading(false)
            setSensor(false)
        })
            .catch((error) => {
                // console.log("error bor")
                setIsLoading(false)
                setSensor(false)
            })
        setName("")

    }



    const selectTeacher = () => {
        let teachername = teacherData.find(el => el._id === userData.teacherid)
        console.log(teachername)
        return <div className="singlepage_name">
            <h2><span>{teachername.name}</span></h2>

            <select className='singlepage_name_select' onChange={(e) => setTeacherId(e.target.value)}>
                <option value="">O'qituvchini o'zgartirish</option>
                {
                    teacherData.filter(el => el._id !== teachername._id && el.subject === teachername.subject).map(el => (
                        <option key={el._id} value={el._id}>{el.name}</option>

                    ))
                }
            </select>

            <button onClick={editClient}>Jo'natish</button>
        </div>
    }


    return (
        <div>
            <div className="singlepage_top">

                <div className="singlepage_topCover">
                    <input onChange={(e) => setAyiruvQiymat(Number(e.target.value))} type="number" value={ayiruvQiymat < 1 ? "" : ayiruvQiymat} placeholder='raqam kiriting...' />

                    <button onClick={ayirish} disabled={ayiruvQiymat < 1}>coindan ayirish</button>
                </div>

                {/* <div className="singlepage_topCover">
                    <input onChange={(e) => setQoshuvQiymat(Number(e.target.value))} type="number" value={qoshuvQiymat < 1 ? "" : qoshuvQiymat} placeholder='raqam kiriting...' />

                    <button onClick={qoshish} disabled={qoshuvQiymat < 1}>coin qoshish</button>
                </div> */}
            </div>


            <button className='single_page_editBtn' onClick={() => setClientEdit(!clientEdit ? true : false)}>Edit</button>
            {/* <button className='single_page_editBtn' onClick={() => reset()}>RESET</button> */}

            <div className="singlepage_main">
                {clientEdit ? <div className="singlepage_update_container">
                    <div className="singlepage_name">
                        <h2><span>{userData.name}</span></h2>
                        <input onChange={(e) => setName(e.target.value)} type="text" placeholder='ismni o`zgartirish' />
                        <button onClick={editClient}>Jo'natish</button>
                    </div>
                    <div className="singlepage_name">
                        <h2><span>{userData.lastname}</span></h2>
                        <input onChange={(e) => setLastname(e.target.value)} type="text" placeholder='familiyani o`zgartirish' />
                        <button onClick={editClient}>Jo'natish</button>
                    </div>
                    <div className="singlepage_name">
                        <h2><span>{userData.number}</span></h2>
                        <input onChange={(e) => setNumberInput(e.target.value)} type="text" placeholder='tel raqanni o`zgartirish' />
                        <button onClick={editClient}>Jo'natish</button>
                    </div>
                    <div className="singlepage_name">
                        <h2><span>{userData.weekday === "odd" ? "toq kunlari" : "juft kunlari"}</span></h2>
                        <select className='singlepage_name_select' onChange={(e) => setWeekday(e.target.value)} >
                            <option value="">hafta kunini tanglang</option>
                            <option value="odd">toq kunlar</option>
                            <option value="even">juft kunlar</option>
                        </select>

                        <button onClick={editClient}>Jo'natish</button>
                    </div>
                    <div className="singlepage_name">
                        <h2><span>{userData.time} vaqtida</span></h2>
                        <select className='singlepage_name_select' onChange={(e) => setLessonTime(e.target.value)}>
                            <option value="">all</option>
                            <option value="6-8">6-8</option>
                            <option value="8-10">8-10</option>
                            <option value="10-12">10-12</option>
                            <option value="12-14">12-14</option>
                            <option value="14-16">14-16</option>
                            <option value="16-18">16-18</option>
                        </select>


                        <button onClick={editClient}>Jo'natish</button>
                    </div>
                    {
                        user.role === "root" ? selectTeacher() : ""
                    }

                </div>
                    : <></>}


                <div className="singlepage_title">
                    <h1>Ismi: <span> {userData?.name}</span></h1>
                    <h2>Umumiy coinlar: <span>{userData?.coin}</span> </h2>
                    <button className='deletebtn' onClick={() => deleteUser(userData._id)}>delete</button>
                </div>

                <div className="single_container">
                    {
                        userData.comments?.map(comment => (
                            <div key={comment._id}>
                                {comment.operation === "plus" ?
                                    <div className="singlepage_plus">
                                        <h2>Qo`shilgan: <span>{comment.amount}</span> </h2>

                                        <span><b>sana:</b> {(new Date((comment.updatedAt)).getDate()) + "." + (new Date((comment.updatedAt)).getMonth() + 1) + "." + (new Date((comment.updatedAt)).getFullYear())}</span>
                                    </div>
                                    :
                                    <div className="singlepage_minus">
                                        <h2>ayirilgan miqdor: <span>{comment.amount} </span> </h2>
                                        {/* <span>{(new Date((comment?.updatedAt))) + " " + (new Date((comment?.updatedAt)))}</span> */}
                                    </div>
                                }
                            </div>))

                    }
                </div>

            </div>
        </div>
    )
}

export default Singlepage