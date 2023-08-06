import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { useAuthContext } from '../../hooks/useAuthContext'
import axios from '../../api/api'
import Staticchild from '../statistics/Staticchild'

function Liststudents({ users }) {
    const { isLoading, setIsLoading, sensor, setSensor } = useContext(AuthContext)
    const [newUser, setNewUser] = useState([])

    const [qoshuvQiymat, setQoshuvQiymat] = useState("")
    const [userData, setUserData] = useState("")
    const { user } = useAuthContext()
    // console.log(newUser)
    // console.log(newUser)
    useEffect(() => {

        const getData = () => {
            setIsLoading(true)
            setTimeout(async () => {
                await axios.get(`/client/getsingle/${users._id}`, {
                    headers: {
                        'Authorization': `Bearer ${user?.token}`
                    }
                })
                    .then(res => {
                        setNewUser(res.data)
                        setIsLoading(false)
                    }
                    )
                    .catch((error) => {
                        console.log("error bor", error)
                        setIsLoading(false)
                    })
            }, 1000);

        }

        if (users._id) {
            getData()
        } else {
            setNewUser(users)
        }

    }, [sensor, userData])


    const qoshish = async (id) => {

        if (users._id) {
            setSensor(true)
            setIsLoading(true)
            await axios.put(`/client/plus/${id}`, { coin: qoshuvQiymat }, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
                .then(res => {
                    setIsLoading(false)
                    setSensor(false)
                    setQoshuvQiymat("")
                })
                .catch((error) => console.log("error bor", error))

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
                    <input type="number" value={qoshuvQiymat === 0 ? setQoshuvQiymat("") : qoshuvQiymat} required onChange={(e) => setQoshuvQiymat(Number(e.target.value))} placeholder='tanga kiriting...' />

                    <button style={qoshuvQiymat ? { borderColor: "green" } : { borderColor: "gray", color: "gray" }}

                        disabled={qoshuvQiymat === "" || qoshuvQiymat < 0 ? true : false} onClick={() => qoshish(newUser._id)}>qo'shish</button>
                </div> : <></>
            }


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
            <Staticchild newUser={newUser} />

            <p className='userlist_subject'>
                {newUser.subject === "it" ? "dasturlash" : newUser.subject === "eng" ? "ingliz" : newUser.subject === "ru" ? "rus tili" : newUser.subject === "math" ? "Matematika" : newUser.subject === "chemistry" ? "kimyo" : newUser.subject === "law" ? "huquq" : ""}
            </p>
        </li>
    )
}

export default Liststudents