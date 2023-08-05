import axios from '../../api/api';
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext';

function Staticchild({ num }) {
    const { isLoading, setIsLoading, sensor, setSensor } = useContext(AuthContext);
    const [Data, setData] = useState([]);
    // const [number, setNumber] = useState("");
    console.log(num)

    const fetchData = async (e) => {
        e.preventDefault()
        setIsLoading(true);
        try {
            const { data } = await axios.get('/auth/get');
            // setData(data.filter(user => user.number == num));
        } catch (error) {
            console.error(error);
            console.log('Error occurred while fetching data');
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div>
            <h1>Staticchild</h1>
        </div>
    )
}

export default Staticchild