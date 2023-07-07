import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Typography, List, ListItem, ListItemText } from '@mui/material';

import { logout } from '../../auth';

const MenuPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            dispatch({ type: 'SET_ROLE', payload: null });
            navigate('/login');
        } catch (error) {
            alert(error)
        }
    };
    const listItemStyle = {
        height: '25%',
    };

    const listItemTextStyle = {
        fontSize: '5rem',
        fontFamily: '-webkit-body',
        width: 'fit-content',
        margin: 'auto',
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem' }}>
                <Typography variant="h6" style={{ color: '#747bff' }}>Purchase Manager</Typography>
                <button onClick={handleLogout}>Logout</button>
            </div>
            <List>
                <ListItem button component={Link} to="/products" style={listItemStyle}>
                    <ListItemText>
                        <Typography style={listItemTextStyle} variant="body1">
                            Products
                        </Typography>
                    </ListItemText>
                </ListItem>
                <ListItem button component={Link} to="/customers" style={listItemStyle}>
                    <ListItemText>
                        <Typography style={listItemTextStyle} variant="body1">
                            Customers
                        </Typography>
                    </ListItemText>
                </ListItem>
                <ListItem button component={Link} to="/purchases" style={listItemStyle}>
                    <ListItemText>
                        <Typography style={listItemTextStyle} variant="body1">
                            Purchases
                        </Typography>
                    </ListItemText>
                </ListItem>
            </List>
        </div>
    );
};

export default MenuPage;