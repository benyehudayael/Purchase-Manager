import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@mui/material';

const LandingPage = () => {
    return (
        <div className="landingContainer">
            <Typography variant="h4">Welcome to Purchase Manager</Typography>
            <div className="landingButtons">
                <Button component={Link} to="/login" variant="contained" color="primary">
                    Login
                </Button>
                <Button component={Link} to="/register" variant="outlined" color="primary">
                    Register
                </Button>
            </div>
        </div>
    );
};

export default LandingPage;
