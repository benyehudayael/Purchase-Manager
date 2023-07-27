import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Typography, List, ListItem, ListItemText } from '@mui/material';

import { logout } from '../../auth';
import { setRole } from '../../actions/userAction';
import ErrorNotification from '../ErrorNotification';

const MenuPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState(null);

    const handleLogout = async () => {
        try {
            await logout();
            dispatch(setRole(null));
            navigate('/login');
        } catch (error) {
            alert(error)
        }
    };

    const handleCloseErrorNotification = () => {
        setErrorMessage(null);
    };

    const MenuListItem = ({ to, children }) => (
        <ListItem button component={Link} to={to} style={listItemStyle}>
            <ListItemText>
                <Typography style={listItemTextStyle} variant="body1">
                    {children}
                </Typography>
            </ListItemText>
        </ListItem>
    );

    // style //
    const listItemStyle = {
        height: '25%',
    };

    const listItemTextStyle = {
        fontSize: '5rem',
        fontFamily: '-webkit-body',
        width: 'fit-content',
        margin: 'auto',
    };
    // style //

    return (
        <>
            {errorMessage && (
                <ErrorNotification
                    message={errorMessage}
                    onClose={handleCloseErrorNotification}
                />
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem' }}>
                <Typography variant="h6" style={{ color: '#747bff' }}>Purchase Manager</Typography>
                <button onClick={handleLogout}>Logout</button>
            </div>
            <List>
                <MenuListItem to="/products">Products</MenuListItem>
                <MenuListItem to="/customers">Customers</MenuListItem>
                <MenuListItem to="/purchases">Purchases</MenuListItem>
            </List>
        </>
    );
};

export default MenuPage;