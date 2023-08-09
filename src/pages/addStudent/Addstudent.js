import React from 'react';
import "./Addstudent.css";
import Userslist from '../../components/userslist/Userslist';
import Forms from '../../components/form/Forms';


function Main() {


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
