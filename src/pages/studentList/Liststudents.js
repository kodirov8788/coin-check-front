import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { useAuthContext } from '../../hooks/useAuthContext'
import axios from '../../api/api'
import { toast } from 'react-toastify';

function Liststudents({ users }) {
    const { setIsLoading, sensor, setSensor } = useContext(AuthContext)
    const [newUser, setNewUser] = useState([])

    const [qoshuvQiymat, setQoshuvQiymat] = useState("")
    const { user } = useAuthContext()

    useEffect(() => {
        setTimeout(() => {
            const getData = async () => {
                // setIsLoading(true)

                await axios.get(`/client/getsingle/${users._id}`, {
                    headers: {
                        'Authorization': `Bearer ${user?.token}`
                    }
                })
                    .then(res => {
                        setNewUser(res.data)
                        // setIsLoading(false)
                    }
                    )
                    .catch((error) => {
                        console.log("error bor", error)
                        // setIsLoading(false)
                    })
            }
            getData()
        }, 500);
        if (users._id) {

        } else {
            setNewUser(users)
        }

    }, [sensor])

    const reset = async () => {
        setSensor(false)
        setIsLoading(true)
        return await axios.put(`/client/minus/${users._id}`, { coin: newUser.coin }, {
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
            })
            .catch((error) => {
                // console.log("error bor", error)
                setIsLoading(false)
                setSensor(true)
                toast.error(error, {
                    position: toast.POSITION.TOP_RIGHT
                });
            })



    }
    const qoshish = async (id) => {
        if (users._id) {
            setSensor(false)
            setIsLoading(true)
            await axios.put(`/client/plus/${id}`, { coin: qoshuvQiymat }, {
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
                    setQoshuvQiymat("")
                })
                .catch((error) => {
                    toast.error(error.response.data, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    setIsLoading(false)
                    setSensor(true)
                })
        }
    }
    return (
        <li className='user_list_item'>

            <div className="userlist_fullname">
                <p className='userlist_name'>
                    <b>{newUser.name}</b>
                </p>
                <p className='userlist_lastname'>
                    <b>{newUser.lastname ? newUser.lastname : "Familiya yo`q"}</b>
                </p>
            </div>


            {newUser._id ?
                <div className="userlist_addcoin">

                    <select className='userlist_select' value={qoshuvQiymat} required onChange={(e) => setQoshuvQiymat(Number(e.target.value))}>
                        <option value="">Coin tanglang!</option>
                        <option value="2">2</option>
                        <option value="5">5</option>
                        <option value="7">7</option>
                        <option value="10">10</option>
                    </select>


                    <button style={qoshuvQiymat ? { borderColor: "green" } : { borderColor: "gray", color: "gray" }}

                        disabled={qoshuvQiymat === "" || qoshuvQiymat < 0 ? true : false} onClick={() => qoshish(newUser._id)}>qo'shish</button>
                </div> : <></>}

            {/* <button style={{ marginRight: "10px" }} className='user_list_link' onClick={reset}>
                Reset
            </button> */}


            <p className='userlist_weekday'>{newUser.weekday === "odd" ? "toq" : "juft"} kunlari</p>
            <p className='userlist_time'>{newUser.time}</p>

            <a className='userlist_number' href={`tel:+998${newUser?.number}`}>{newUser.number ? newUser.number : "nomer yo'q"}</a>

            <p className='userlist_coin'>
                <b style={{ color: 'red' }}>{newUser.coin}</b>
            </p>
            {
                newUser._id ? <Link className='user_list_link' to={`/debt/${newUser._id}`}>
                    Taxrirlash
                </Link> : <></>
            }

            <p className='userlist_subject'>
                {newUser.subject?.toUpperCase()}
            </p>
        </li >
    )
}

export default Liststudents