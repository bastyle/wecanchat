import React from 'react';
import './dash-feat.css';
import wecantalk from './wecantalk.png';
const DashFeat = () => {
    return (
        <div className="dash-feat">
            <img className="dash-img" src={wecantalk} alt='' /> 
            <button className='dash-button'>
                Announcements 
            </button>
            <button className='dash-button'>
                Profile
            </button>
            <button className='dash-button'>
                Logout
            </button>
        </div>
    );
};

export default DashFeat;
