import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/auth/register', { email, password, name }, {
                withCredentials: true,
            });
            if (response.status === 200) {
                alert('Registration successful');
                console.log('Registration sucessful', response.data);
                navigate('/login');
            } else {
                setError('Registration failed: ' + (response.data.message || 'Unkown error'));
            }
        } catch (error) {
            console.error('Registration error:', error);
            setError('Registration failed: ' + (error.response?.data?.message || 'Server error'));
        }
    };

    return (
        <div className="auth-form-container">
            <h2>Register</h2>
            {error && <p>{error}</p>}
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="name">name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Name" id="name" name="name" />
                <label htmlFor="email">email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="emaill" name="email" />
                <label htmlFor="password">password</label>
                <input value={password} onChange={(e) => setPass(e.target.value)} type="password" placeholder="*******" id="password" name="password" />
                <button type="submit">Register</button>
            </form>
            <button className="link-btn" onClick={() => navigate('/login')}>Already have an account? Login here</button>
        </div>
    )
};

export default Register;