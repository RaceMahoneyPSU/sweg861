import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext'; 


const ProfileDashboard = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
  
    return (
        <div className="profile-dashboard">
            <h2>Welcome, {user ? user.name : 'Guest'}!</h2>
            <button className="go-to-form-button" onClick={() => navigate('/form')}>
                Go to Application Form
            </button>
        </div>
    );
};

export default ProfileDashboard;