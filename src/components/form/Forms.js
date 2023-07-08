import Axios from '../../api/api'
import React, { useContext } from 'react'
import "./Form.css"
import { AuthContext } from '../../context/AuthContext'
import { useAuthContext } from '../../hooks/useAuthContext'
function Forms() {
    const { isLoading, setIsLoading, sensor, setSensor } = useContext(AuthContext)

    const { user } = useAuthContext()
    // console.log(user)
    // console.log(isLoading)
    const sendForm = async (e) => {
        e.preventDefault()
        setSensor(false)
        setIsLoading(true)
        let name = e.target[0].value
        let lastname = e.target[1].value
        let number = e.target[2].value
        let coin = e.target[3].value
        let weekdays = e.target[4].value
        let lessontime = e.target[5].value

        let newuser = {
            name,
            lastname,
            coin,
            teacherid: user.id,
            weekday: weekdays,
            time: lessontime,
            number: number,
        }
        console.log(newuser)
        setTimeout(async () => {
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
            e.target[4].value = ""
            e.target[5].value = ""
        }, 500);





    }

    return (
        <form className='form' action="" onSubmit={sendForm}>
            <div className="form_text">
                <h3>O'quvchi qo'shish:</h3>
            </div>
            <div className="inputs">
                <input type="text" placeholder='Ismni kiriting...' required />
                <input type="text" placeholder='Familiyani kiriting...' required />
                <input type="number" placeholder='tel raqam' required />
                <select required >
                    <option value="">coin tanglang</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="5">5</option>
                    <option value="7">7</option>
                    <option value="10">10</option>
                </select>
                <select required>
                    <option value="">hafta kunini tanglang</option>
                    <option value="odd">toq kunlar</option>
                    <option value="even">juft kunlar</option>
                </select>
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