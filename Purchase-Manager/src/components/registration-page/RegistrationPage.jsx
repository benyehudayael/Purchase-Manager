import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { auth } from '../../firebase';

const RegistrationPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleRegistration = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            await auth.createUserWithEmailAndPassword(email, password);
            setError(null);
            navigate('/login');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box mt={5} height="500px" display="flex" flexDirection="column" alignItems="center">
                <Typography variant="h4">Registration</Typography>
                <form onSubmit={handleRegistration} style={{ marginTop: '1rem', height: '49%' }}>
                    <TextField
                        label="Email"
                        type="email"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <TextField
                        label="Confirm Password"
                        type="password"
                        variant="outlined"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    {error && <Typography color="error">{error}</Typography>}
                    <Button type="submit" variant="contained" color="primary">
                        Register
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default RegistrationPage;
