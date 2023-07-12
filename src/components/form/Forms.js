import Axios from '../../api/api'
import React, { useContext, useState } from 'react'
import "./Form.css"
import { AuthContext } from '../../context/AuthContext'
import { useAuthContext } from '../../hooks/useAuthContext'
function Forms() {
    const { isLoading, setIsLoading, sensor, setSensor } = useContext(AuthContext)



    const [inputRadio, setinputRadio] = useState("")
    const { user } = useAuthContext()
    console.log(inputRadio)
    const sendForm = async (e) => {
        e.preventDefault()


        if (inputRadio === "") {
            alert("joylarni to`ldiring")
        } else {
            setSensor(false)
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
            console.log(newuser)
            await Axios.post("/client/create", newuser, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            }).then(res => console.log(res))
                .catch(() => console.log("error chiqdi"))
            setIsLoading(false)
            setSensor(true)
            e.target[0].value = ''
            e.target[1].value = ''
            e.target[2].value = ''
            e.target[3].value = ''
            e.target[6].value = ""


            console.log("joylandi")
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
                <input type="number" className='forms_input' required placeholder='coin miqdori' />
                <div class="radio-group" onChange={(e) => setinputRadio(e.target.value)} required>
                    <input type="radio" value={"odd"} id="option-one" name="selector" />
                    <label for="option-one">Toq</label>
                    <input type="radio" value={"even"} id="option-two" name="selector" />
                    <label for="option-two" >Juft</label>
                </div>

                <select required>
                    <option value="">dars vaqtini tanglang</option>
                    <option value="8-10">8-10</option>
                    <option value="10-12">10-12</option>
                    <option value="14-16">14-16</option>
                    <option value="16-18">16-18</option>
                </select>


                <button className='btn'>Qo'shish</button>

            </div>
        </form>
    )
}

export default Forms