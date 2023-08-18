import React, { useContext, useEffect, useState } from 'react'
import "./Statistics.css"

import { AuthContext } from '../../context/AuthContext';
import Axios from '../../api/api';
import { Link } from 'react-router-dom';
import Staticchild from './Staticchild';

function Statistics() {
    // const [total, setTotal] = useState();
    const [Datas, setDatas] = useState([]);
    const [Length, setLength] = useState(0);
    console.log("length:", Length)
    const [selectData, setSelectData] = useState("");
    const { setIsLoading, setSensor } = useContext(AuthContext);
    // console.log(Data)
    useEffect(() => {
        const fetchData = async () => {
            setSensor(true);
            setIsLoading(true)
            try {
                const { data } = await Axios.get('/auth/filter');
                setDatas(data);
                // console.log(data)
                setIsLoading(false)

            } catch (error) {
                console.error(error);
                setIsLoading(false)
                console.log('Error occurred while fetching data');
            }
        };
        fetchData();
    }, []);


    const Arraylist = () => {
        const [data, setData] = useState([]);

        const sorted = Datas.sort((a, b) => b.allCoin - a.allCoin)

        useEffect(() => {

            // console.log(sorted)
            if (sorted) {
                const filteredData = Datas.filter(use => use.allCoin > +selectData && use.allCoin < (+selectData + 50));
                if (selectData === "") {
                    setData(sorted);
                    setLength(sorted.length)

                } else {
                    setData(filteredData);
                    setLength(filteredData.length)

                }
            }
        }, [selectData]);

        return data.map((array, index) => (
            <Staticchild key={index} arraydata={array} inx={index} />
        ));
    }

    // useEffect(() => {
    //     const getData = () => {
    //     }
    //     getData()
    // }, [Data])


    return (
        <div className="client">
            <Link to={"/login"}>Loginga qaytish</Link>
            <div className="client_wrap">
                <h1>Statistika</h1>
                <h2 >O'quvchilar soni: <span style={{ color: "red" }}>{Length}</span></h2>
            </div>
            <select onChange={(e) => setSelectData(e.target.value)}>
                <option value="0">miqdorni tanglang</option>
                <option value="50">50 dan 100 gacha</option>
                <option value="100">100 dan 150 gacha</option>
                <option value="150">150 dan 200 gacha</option>
                <option value="200">200 dan 250 gacha</option>
                <option value="250">250 dan 300 gacha</option>
                <option value="300">300 dan 350 gacha</option>
                <option value="350">350 dan 400 gacha</option>
                <option value="400">400 dan 450 gacha</option>
                <option value="450">450 dan 500 gacha</option>
                <option value="500">500 dan 550 gacha</option>
                <option value="550">550 dan 600 gacha</option>
                <option value="600">600 dan 650 gacha</option>
                <option value="650">650 dan 700 gacha</option>
                <option value="700">700 dan 750 gacha</option>
                <option value="750">750 dan 800 gacha</option>
                <option value="800">800 dan 850 gacha</option>
                <option value="850">850 dan 900 gacha</option>
                <option value="900">900 dan 950 gacha</option>

            </select>
            <Arraylist />
        </div>
    );
}

export default Statistics;
