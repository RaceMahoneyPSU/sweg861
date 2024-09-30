import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');
    const { setUser } = useContext(UserContext);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    axios.defaults.baseURL = 'http://localhost:5000';
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/auth/login', { email, password }, {
                withCredentials: true, 
            });

            if (response.status === 200) {
                const data = response.data;
                console.log('Login successful:', data);
                setUser({
                    _id: data.user._id,
                    name: data.user.name,
                    email: data.user.email,
                });
                alert('Login Successful');
                navigate('/dashboard')
            } else {
                setError('Login failed: ' + (response.data.message || 'Unkown error'));
            }
        } catch (error) {
            setError('Invalid Credentials');
        }
    };

    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            {error && <p>{error}</p>}
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="emaill" name="email" />
                <label htmlFor="password">password</label>
                <input value={password} onChange={(e) => setPass(e.target.value)} type="password" placeholder="***********" id="password" name="password" />
                <button type="submit">Log In</button>
            </form>
            <button className="link-btn" onClick={() => navigate('/register')}>Don't have an account? Register here</button>
        </div>
    )
};

export default Login;

