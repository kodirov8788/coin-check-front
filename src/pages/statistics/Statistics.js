import React, { useContext, useEffect, useState } from 'react'
import "./Statistics.css"

import { AuthContext } from '../../context/AuthContext';
import Axios from '../../api/api';
import { Link } from 'react-router-dom';
import Staticchild from './Staticchild';

function Statistics() {
    const [total, setTotal] = useState();
    const [Data, setData] = useState([]);
    const [selectData, setSelectData] = useState("");
    const { setIsLoading, setSensor } = useContext(AuthContext);
    // console.log(Data)
    useEffect(() => {
        const fetchData = async () => {
            setSensor(true);
            setIsLoading(true)
            try {
                const { data } = await Axios.get('/auth/filter');
                setData(data);
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

        const sorted = Data.sort((a, b) => b.allCoin - a.allCoin)

        useEffect(() => {

            console.log(sorted)
            if (sorted) {
                const filteredData = Data.filter(use => use.allCoin > +selectData && use.allCoin < (+selectData + 100));
                if (selectData === "") {
                    setData(sorted);
                } else {
                    setData(filteredData);
                }
            }
        }, [selectData]);

        return data.map((array, index) => (
            <Staticchild key={index} arraydata={array} inx={index} />
        ));
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
        </div>
    );
}

export default Statistics;
