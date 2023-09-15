import Axios from '../../api/api'
import React, { useContext, useState } from 'react'
import "./Form.css"
import { AuthContext } from '../../context/AuthContext'
import { useAuthContext } from '../../hooks/useAuthContext'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'


function Forms() {
    const { setIsLoading, setSensor } = useContext(AuthContext)


    const [inputRadio, setinputRadio] = useState("")
    const { user } = useAuthContext()
    // console.log(inputRadio)
    const sendForm = async (e) => {
        e.preventDefault()


        if (inputRadio === "") {
            toast.warn("kunini tanglang!", {
                position: toast.POSITION.TOP_RIGHT
            });
        } else if (e.target[2]?.value.length !== 9) {
            toast.warn("9 xonalik raqam kiriting! misol: 93 000 00 00", {
                position: toast.POSITION.TOP_RIGHT
            });
        } else {
            setSensor(false)
            setSensor(true)
            setIsLoading(true)
            let name = e.target[0].value
            let lastname = e.target[1].value
            let number = e.target[2].value
            let coin = e.target[3].value
            let lessontime = e.target[6].value
            let newuser = {
                name,
                lastname,
                coin,
                teacherid: user.id,
                subject: user.subject,
                weekday: inputRadio,
                time: lessontime,
                number: number,
            }
            // console.log(newuser)
            await Axios.post("/client/create", newuser, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            }).then(res => {
                toast.success(res.data, {
                    position: toast.POSITION.TOP_RIGHT
                });
                setIsLoading(false)
                setSensor(false)
                e.target[0].value = ''
                e.target[1].value = ''
                e.target[2].value = ''
                e.target[3].value = ''
                e.target[6].value = ""

            })
                .catch((error) => {
                    toast.error(error.response.data, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    // console.log(error)
                    setIsLoading(false)
                    setSensor(false)
                })
        }




    }

    return (
        <form className='form' action="" onSubmit={sendForm}>
            <div className="form_text">
                <h3>O'quvchi qo'shish:</h3>
            </div>
            <div className="inputs">
                <input className='forms_input' type="text" placeholder='Ismni kiriting...' required />
                <input className='forms_input' type="text" placeholder='Familiyani kiriting...' required />
                <input className='forms_input' type="number" placeholder='tel raqam' required />
                <select className='userlist_select' required >
                    <option value="">Coin tanglang!</option>
                    <option value="2">2</option>
                    <option value="5">5</option>
                    <option value="7">7</option>
                    <option value="10">10</option>

                </select>
                <div className="radio-group" onChange={(e) => setinputRadio(e.target.value)} required>
                    <input type="radio" value={"odd"} id="option-one" name="selector" />
                    <label htmlFor="option-one">Toq</label>
                    <input type="radio" value={"even"} id="option-two" name="selector" />
                    <label htmlFor="option-two" >Juft</label>
                </div>

                <select required>
                    <option value="">dars vaqtini tanglang</option>
                    <option value="8-10">8-10</option>
                    <option value="10-12">10-12</option>
                    <option value="12-14">12-14</option>
                    <option value="14-16">14-16</option>
                    <option value="16-18">16-18</option>
                </select>


                <button className='btn'>Qo'shish</button>

            </div>
        </form >
    )
}

export default Forms