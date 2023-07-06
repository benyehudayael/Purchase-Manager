import React from 'react';
import { useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { Typography, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../auth';

const MenuPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            // Perform logout
            await logout();

            dispatch({ type: 'SET_ROLE', payload: null });
            navigate('/login');
            // Other logic after successful logout
        } catch (error) {
            // Handle logout error
        }
    };

    return (
        <div>
            <Typography variant="h1">Menu</Typography>
            <List>
                <ListItem button component={Link} to="/products">
                    <ListItemText primary="Products" />
                </ListItem>
                <ListItem button component={Link} to="/customers">
                    <ListItemText primary="Customers" />
                </ListItem>
                <ListItem button component={Link} to="/purchases">
                    <ListItemText primary="Purchases" />
                </ListItem>
            </List>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default MenuPage;