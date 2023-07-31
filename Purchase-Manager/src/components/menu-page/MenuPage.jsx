import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Typography, List, ListItem, ListItemText } from '@mui/material';

import { logout } from '../../auth';
import { setRole } from '../../actions/userAction';
import ErrorNotification from '../ErrorNotification';
import { listItemStyle, listItemTextStyle } from './styles';

const MenuPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState(null);

    const logoutHandler = async () => {
        try {
            await logout();
            dispatch(setRole(null));
            navigate('/login');
        } catch (error) {
            setErrorMessage(error)
        }
    };

    const handleCloseErrorNotification = () => {
        setErrorMessage(null);
    };

    const MenuListItem = ({ path, children }) => (
        <ListItem button component={Link} to={path} style={listItemStyle}>
            <ListItemText>
                <Typography style={listItemTextStyle} variant="body1">
                    {children}
                </Typography>
            </ListItemText>
        </ListItem>
    );

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
                <button onClick={logoutHandler}>Logout</button>
            </div>
            <List>
                <MenuListItem path="/products">Products</MenuListItem>
                <MenuListItem path="/customers">Customers</MenuListItem>
                <MenuListItem path="/purchases">Purchases</MenuListItem>
            </List>
        </>
    );
};

export default MenuPage;