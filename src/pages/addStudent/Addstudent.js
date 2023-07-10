import React, { useContext, useEffect } from 'react';
import "./Addstudent.css";
import Userslist from '../../components/userslist/Userslist';
import Forms from '../../components/form/Forms';
import { useAuthContext } from '../../hooks/useAuthContext';
import axios from '../../api/api';
import { AuthContext } from '../../context/AuthContext';

function Main() {
    const { user } = useAuthContext();
    let { isLoading, setIsLoading } = useContext(AuthContext)


    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const response = await axios.get('/auth/get', {
                    headers: { 'Authorization': `Bearer ${user.token}` }
                });

                const json = response.data;
                // console.log(json);
            } catch (error) {
                console.log('Error occurred while fetching workouts:', error);
            }
        };

        if (user) {
            fetchWorkouts();
        }
    }, [user]);

    return (
        <div className='Main'>
            <div className="plas">
                <Forms />
            </div>
            <Userslist />
        </div>
    );
}

export default Main;
