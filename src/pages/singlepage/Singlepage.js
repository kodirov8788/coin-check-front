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
    const { isLoading, setIsLoading, sensor, setSensor } = useContext(AuthContext)
    const { user } = useAuthContext()
    const [ayiruvQiymat, setAyiruvQiymat] = useState({
        coin: 0,
        info: ""
    })
    const [qoshuvQiymat, setQoshuvQiymat] = useState({
        coin: 0,
        info: ""
    })

    const [userData, setUserData] = useState([])
    console.log(userData)
    const getApi = async () => {
        setIsLoading(true)
        if (user) {
            await Axios.get("/client/get", {
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
        await Axios.put(`/client/minus/${id}`, ayiruvQiymat, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
            .then(res => console.log(res))
            .catch((error) => console.log("error bor", error))
        setIsLoading(false)
        setSensor(true)
        setQoshuvQiymat({ ...qoshuvQiymat, coin: 0, info: "" })
        setAyiruvQiymat({ ...ayiruvQiymat, coin: 0, info: "" })
    }

    const qoshish = async () => {
        setSensor(false)
        setIsLoading(true)
        await Axios.put(`/client/plus/${id}`, qoshuvQiymat, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
            .then(res => console.log(res))
            .catch((error) => console.log("error bor", error))
        setIsLoading(false)
        setSensor(true)
        setQoshuvQiymat({ ...qoshuvQiymat, coin: 0, info: "" })
        setAyiruvQiymat({ ...ayiruvQiymat, coin: 0, info: "" })
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
            console.log(response.data); // Assuming the server sends a response with the deleted user information
        } catch (error) {
            console.error(error);
            console.log('Error occurred while deleting user');
        }
        setIsLoading(false);
        setSensor(true)
        navigate("/")
    };
    return (
        <div>
            <div className="singlepage_top">
                {
                    user.role === "root" ? <div className="singlepage_topCover">
                        <input onChange={(e) => setAyiruvQiymat({ ...ayiruvQiymat, coin: Number(e.target.value) })} type="number" value={ayiruvQiymat.coin < 1 ? "" : ayiruvQiymat.coin} placeholder='coindan yechish' />

                        <input type="text" placeholder='nima oldi?' onChange={(e) => setAyiruvQiymat({ ...ayiruvQiymat, info: e.target.value })} value={ayiruvQiymat.info.length < 1 ? "" : ayiruvQiymat.info} />

                        <button onClick={ayirish}>coinni yechish</button>

                    </div> : <></>
                }
                <div className="singlepage_topCover">

                    <select required onChange={(e) => setQoshuvQiymat({ ...qoshuvQiymat, coin: Number(e.target.value) })} value={qoshuvQiymat.coin}>
                        <option value="">coin tanglang</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="5">5</option>
                        <option value="7">7</option>
                        <option value="10">10</option>
                    </select>

                    <button onClick={qoshish}>coin qo`shish</button>
                </div>
            </div>

            <div className="singlepage_main">
                <div className="singlepage_title">
                    <h1>Ismi: <span> {userData.name}</span></h1>
                    <h2>Umumiy coinlar: <span>{userData.coin}</span> </h2>
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

                                        <span><b>sana:</b> {(new Date((comment.updatedAt)).toDateString()) + " " + (new Date((comment.updatedAt)).toLocaleTimeString())}</span>
                                    </div>
                                    :
                                    <div className="singlepage_minus">
                                        <h2>ayirilgan miqdor: <span>{comment.amount} </span> </h2>
                                        <span>{(new Date((comment.updatedAt)).toDateString()) + " " + (new Date((comment.updatedAt)).toLocaleTimeString())}</span>
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