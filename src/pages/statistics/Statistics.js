import React, { useContext, useEffect, useState } from 'react'
import "./Statistics.css"
import Liststudents from '../studentList/Liststudents'
import { useAuthContext } from '../../hooks/useAuthContext';
import { AuthContext } from '../../context/AuthContext';
import Axios from '../../api/api';
import { Link } from 'react-router-dom';
import Staticchild from './Staticchild';
function Statistics() {
    const [total, setTotal] = useState()
    const [Data, setData] = useState([]);
    const [arraylist, setArraylist] = useState([]);
    // console.log(arraylist)
    const { isLoading, setIsLoading, sensor, setSensor } = useContext(AuthContext);
    // console.log("data :", Data)

    useEffect(() => {
        const fetchData = async () => {
            // setIsLoading(true);
            setSensor(true)
            try {
                const { data } = await Axios.get('/auth/get');
                setData(data)
                setSensor(false)
                // setIsLoading(false);
            } catch (error) {
                console.error(error);
                console.log('Error occurred while fetching data');
                setSensor(false)
            }
        };
        // setIsLoading(false);
        fetchData()
    }, [sensor])



    useEffect(() => {

        async function findDuplicateUsers(users) {
            const phoneNumberGroups = await users.reduce((acc, user) => {
                if (!acc[user.number]) {
                    acc[user.number] = [];
                }
                acc[user.number].push(user);
                return acc;
            }, {});

            const duplicates = [];
            const singlebox = []
            for (const phoneNumber in phoneNumberGroups) {
                if (phoneNumberGroups[phoneNumber].length > 1) {
                    duplicates.push(phoneNumberGroups[phoneNumber]);
                } else {
                    singlebox.push(phoneNumberGroups[phoneNumber]);
                }
            }

            return ([...duplicates, ...singlebox])
        }


        findDuplicateUsers(Data)
            .then(user => setArraylist(user))
            .catch(error => console.log(error))
    }, [Data, sensor])




    const Arraylist = () => {
        const newArr = arraylist.map(user => {
            const box = []
            user.forEach(ar => box.push(ar.coin))
            const allCoin = box.reduce((a, b) => a + b, 0)

            return { allCoin, user }
        })

        const arrayData = newArr.sort((a, b) => b.allCoin - a.allCoin)
        // console.log("array data", arrayData)
        return arrayData.map((array, index) => (
            <Staticchild key={index} arraydata={array} inx={index} />
        ))

    }

    return (
        <div className="client">
            <Link to={"/login"}>Loginga qaytish</Link>
            <h1>Statistika</h1>
            <Arraylist />
        </div >
    )
}

export default Statistics