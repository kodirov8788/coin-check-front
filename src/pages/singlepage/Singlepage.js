import React, { useState, useEffect, useContext } from 'react'
import "./Singlepage.css"
import Axios from '../../api/api'
import { useNavigate, useParams } from "react-router-dom"
import LoadingSpinner from '../../components/loaderSpinner/LoaderSpinner'
import { AuthContext } from '../../context/AuthContext'
import { useAuthContext } from '../../hooks/useAuthContext'
function Singlepage() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [Name, setName] = useState("")
    const [Lastname, setLastname] = useState("")
    const [NumberInput, setNumberInput] = useState("")
    const [weekdays, setWeekday] = useState("");
    const [lessonTime, setLessonTime] = useState("");
    console.log(lessonTime)
    const { isLoading, setIsLoading, sensor, setSensor } = useContext(AuthContext)
    const { user } = useAuthContext()
    const [ayiruvQiymat, setAyiruvQiymat] = useState("")
    const [qoshuvQiymat, setQoshuvQiymat] = useState("")
    const [clientEdit, setClientEdit] = useState(false)
    const [userData, setUserData] = useState([])
    console.log(clientEdit)
    // console.log(userData)
    const getApi = async () => {
        setIsLoading(true)
        if (user) {
            await Axios.get("/auth/get", {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
                .then((res) => {
                    setUserData(res.data.find(us => us._id === id))
                    setIsLoading(false)
                })
                .catch((error) => console.log("error bor"))
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
            .then(res => console.log(res))
            .catch((error) => console.log("error bor", error))
        setIsLoading(false)
        setSensor(true)
        setQoshuvQiymat(0)
        setAyiruvQiymat(0)
    }

    const qoshish = async () => {
        setSensor(false)
        setIsLoading(true)
        await Axios.put(`/client/plus/${id}`, { coin: qoshuvQiymat }, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
            .then(res => console.log(res))
            .catch((error) => console.log("error bor", error))
        setIsLoading(false)
        setSensor(true)
        setQoshuvQiymat(0)
        setAyiruvQiymat(0)
    }
    const deleteUser = async (id) => {
        setIsLoading(true);
        setSensor(false)
        try {
            const response = await Axios.delete(`/client/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            // console.log(response.data); // Assuming the server sends a response with the deleted user information
        } catch (error) {
            console.error(error);
            // console.log('Error occurred while deleting user');
        }
        setIsLoading(false);
        setSensor(true)
        navigate("/")
    };

    const editClient = async () => {
        console.log(id)
        setIsLoading(true)
        setSensor(true)

        let newuser = {
            name: Name,
            lastname: Lastname,
            number: NumberInput,
            weekday: weekdays,
            time: lessonTime
        }
        await Axios.put(`/client/update/${id}`, newuser, {
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

    }
    return (
        <div>
            <div className="singlepage_top">
                {
                    user.role === "root" ? <>
                        <div className="singlepage_topCover">
                            <input onChange={(e) => setAyiruvQiymat(Number(e.target.value))} type="number" value={ayiruvQiymat < 1 ? "" : ayiruvQiymat} placeholder='coindan yechish' />

                            <button onClick={ayirish}>coinni yechish</button>

                        </div>
                        <div className="singlepage_topCover">


                            <input type="number" required onChange={(e) => setQoshuvQiymat(Number(e.target.value))} placeholder='tanga miqdorini kiriting...' />

                            <button disabled={qoshuvQiymat < 1 ? true : false} onClick={qoshish}>coin qo`shish</button>
                        </div>
                    </>
                        : <></>
                }

            </div>

            <button className='single_page_editBtn' onClick={() => setClientEdit(!clientEdit ? true : false)}>Edit</button>
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
                        <select onChange={(e) => setWeekday(e.target.value)} >
                            <option value="">hafta kunini tanglang</option>
                            <option value="odd">toq kunlar</option>
                            <option value="even">juft kunlar</option>
                        </select>

                        <button onClick={editClient}>Jo'natish</button>
                    </div>
                    <div className="singlepage_name">
                        <select onChange={(e) => setLessonTime(e.target.value)}>
                            <option value="">all</option>
                            <option value="8-10">8-10</option>
                            <option value="10-12">10-12</option>
                            <option value="14-16">14-16</option>
                            <option value="16-18">16-18</option>
                        </select>
                        <button onClick={editClient}>Jo'natish</button>
                    </div>
                </div>
                    : <></>}


                <div className="singlepage_title">
                    <h1>Ismi: <span> {userData?.name}</span></h1>
                    <h2>Umumiy coinlar: <span>{userData?.coin}</span> </h2>
                    {
                        user?.role === "root" ?
                            <button className='deletebtn' onClick={() => deleteUser(userData._id)}>delete</button> : ""
                    }

                </div>
                <div className="single_container">
                    {
                        userData.comments?.map(comment => (
                            <div key={comment._id}>
                                {comment.operation === "plus" ?
                                    <div className="singlepage_plus">
                                        <h2>Qo`shilgan: <span>{comment.amount}</span> </h2>

                                        <span><b>sana:</b> {(new Date((comment.updatedAt)).getDate()) + "." + (new Date((comment.updatedAt)).getMonth()) + "." + (new Date((comment.updatedAt)).getFullYear())}</span>
                                    </div>
                                    :
                                    <div className="singlepage_minus">
                                        <h2>ayirilgan miqdor: <span>{comment.amount} </span> </h2>
                                        <span>{(new Date((comment.updatedAt)).toDateString()()) + " " + (new Date((comment.updatedAt)).toLocaleTimeString())}</span>
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