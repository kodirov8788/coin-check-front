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
    const [selectData, setSelectData] = useState("");
    const [arraylist, setArraylist] = useState([]);

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

        const [data, setData] = useState([])
        const newArr = arraylist.map(user => {
            const box = []
            user.forEach(ar => box.push(ar.coin))
            const allCoin = box.reduce((a, b) => a + b, 0)

            return { allCoin, user }
        })
        const arrayData = newArr.sort((a, b) => b.allCoin - a.allCoin)

        useEffect(() => {
            if (newArr) {

                const filteredData = arrayData.filter(use => use.allCoin > +selectData && use.allCoin < (+selectData + 100));

                if (selectData === "") {
                    setData(arrayData);
                } else {
                    setData(filteredData);

                }
            }
        }, [selectData]);

        // newArr.forEach(use => box.push(use.allCoin > Number(selectData) || use.coin < (Number(selectData) + 100)))
        return data.map((array, index) => (
            <Staticchild key={index} arraydata={array} inx={index} />
        ))


    }

    return (
        <div className="client">
            <Link to={"/login"}>Loginga qaytish</Link>
            <h1>Statistika</h1>
            <select onChange={(e) => setSelectData(e.target.value)}>
                <option value="0">miqdorni tanglang</option>
                <option value="50">50 dan tepasi</option>
                <option value="100">100 dan tepasi</option>
                <option value="200">200 dan tepasi</option>
                <option value="300">300 dan tepasi</option>
                <option value="400">400 dan tepasi</option>
                <option value="500">500 dan tepasi</option>
                <option value="600">600 dan tepasi</option>
            </select>
            <Arraylist />
        </div >
    )
}

export default Statistics