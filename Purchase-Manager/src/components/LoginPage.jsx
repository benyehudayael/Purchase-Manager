import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../auth';
import { useDispatch } from 'react-redux';
import { Button, TextField, Typography } from '@mui/material';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { token, role } = await login(email, password);
            localStorage.setItem('token', token);
            localStorage.setItem('userRole', role);
            dispatch({ type: 'SET_ROLE', payload: role });
            navigate('/');
        } catch (error) {
            setError('Invalid username or password.');
        }
    };

    return (
        <div className='loginContainer'>
            <Typography variant="h2">Login</Typography>
            <form onSubmit={handleSubmit}>
                <div className='apace-between'>
                    <label>Email:</label>
                    <TextField
                        size="small"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className='apace-between'>
                    <label>Password:</label>
                    <TextField
                        size="small"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p>{error}</p>}
                <Button type="submit" variant="contained" color="primary">
                    Login
                </Button>
            </form>
        </div>
    );
};

export default LoginPage;
