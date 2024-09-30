import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Form = () => {

    const [formData, setFormData] = useState({
        userId: '',
        firstName: '',
        lastName: '',
        age: '',
        street: '',
        country: '',
        phoneNumber: '',
        email: '',
        years: '',
        reason: ''
    });
    const [message, setMessage] = useState('');
    const [activeTab, setActiveTab] = useState('new');
    const [isEdit, setIsEdit] = useState(false); 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            // If not in edit mode, no need to fetch form data
            if (!isEdit) return;

            try {
                // Fetch the current user's ID
                const { data: userResponse } = await axios.get('http://localhost:5000/auth/current-user', {
                    withCredentials: true
                });
                const userId = userResponse.userId;
                console.log(userId);

                if (userId) {
                    // Fetch form data for the user if userId is present
                    const { data: formResponse } = await axios.get(`http://localhost:5000/api/form/${userId}`);
                    setFormData(formResponse);  // Populate form with existing data
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [isEdit])


    const handleTabChange = (tab) => {
        setActiveTab(tab);
        if (tab === 'update') {
            setIsEdit(true); // Set to edit mode if updating
        } else {
            setIsEdit(false); // Set to new application mode
            setFormData({ // Reset form data for new application
                firstName: '',
                lastName: '',
                age: '',
                street: '',
                country: '',
                phoneNumber: '',
                email: '',
                years: '',
                reason: '',
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEdit) {
                // Update existing application
                await axios.put(`http://localhost:5000/api/update-form/${formData.userId}`, formData, { withCredentials: true });
                alert('Update successful!');
            } else {
                //Get the current user
                const currentUserResponse = await axios.get('http://localhost:5000/auth/current-user', { withCredentials: true });
                const { userId } = currentUserResponse.data;
                console.log(userId);
                const newFormData = { ...formData, userId };

                // Submit new application\
                console.log("Submitting form data:", newFormData);
                await axios.post(`http://localhost:5000/api/submit-form`, newFormData);
                alert('Submission successful!');
            }
            
            handleTabChange('new'); // Reset to new application after submission
        } catch (error) {
            console.error(error);
        }
    };
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/delete-form/${formData.userId}`, { withCredentials: true });
            alert('Application withdrawn successfully!');
            // Optionally reset form or redirect after deletion
            handleTabChange('new'); // Reset to new application after deletion
        } catch (error) {
            console.error('Error withdrawing application:', error);
            alert('Failed to withdraw application.');
        }
    };


    const handleLogout = () => {
        localStorage.removeItem('token');
        alert('You have logged out.');
        navigate('/login')
    };

    return (
        <div>
            <div className="header">
                <button className="logout-button" onClick={handleLogout}>Logout</button>
                <button className="dash-button" onClick={() => navigate('/dashboard')}>Dashboard</button>
            </div>

            <div className="form-container">
                <div className="tabs">
                    <button onClick={() => handleTabChange('new')}>New Application</button>
                    <button onClick={() => handleTabChange('update')}>Update Application</button>
                    <button className="withdraw-button" onClick={handleDelete}>Withdraw Application</button>
                </div>
                <h2>{isEdit ? 'Update Application Form' : 'New Application Form'}</h2>
                <h3>{isEdit ? 'Fill in information to be updated' : 'Please submit your information to be considered on a climbing expedition to K2 in 2025'}</h3>
                <form className="form" onSubmit={handleSubmit}>
                    <label htmlFor="firstName">First Name*</label>
                    <input required={!isEdit} value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} type="text" placeholder="First Name" id="firstName" name="firstName" />

                    <label htmlFor="lastName">Last Name*</label>
                    <input required={!isEdit} value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} type="text" placeholder="Last Name" id="lastName" name="lastName" />

                    <label htmlFor="age">Age*</label>
                    <input required={!isEdit} value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })} type="number" placeholder="" id="age" name="age" />

                    <label htmlFor="street">Street*</label>
                    <input required={!isEdit} value={formData.street} onChange={(e) => setFormData({ ...formData, street: e.target.value })} type="text" placeholder="100 Street Ave" id="street" name="street" />

                    <label htmlFor="country">Country*</label>
                    <input required={!isEdit} value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} type="text" placeholder="USA" id="country" name="country" />

                    <label htmlFor="phone">Phone Number*</label>
                    <input required={!isEdit} value={formData.phoneNumber} onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })} type="tel" placeholder="***-***-****" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" id="phone" name="phone" />

                    <label htmlFor="email">Email</label>
                    <input value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} type="email" placeholder="youremail@gmail.com" id="email" name="email" />

                    <label htmlFor="years">Years of Climbing Experience</label>
                    <input value={formData.years} onChange={(e) => setFormData({ ...formData, years: e.target.value })} type="number" placeholder="" id="years" name="years" />

                    <label htmlFor="reason">Why do you want to climb K2?</label>
                    <textarea value={formData.reason} onChange={(e) => setFormData({ ...formData, reason: e.target.value })} rows="4" cols="50" placeholder="" id="reason" name="reason" />

                    <h7>* = Required</h7>
                    <button className="submit-button" type="submit">{isEdit ? 'Update Application' : 'Submit Application'}</button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default Form;