import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Typography, List, ListItem, ListItemText, Container, Box } from '@mui/material';

import { setRole } from '../../actions/userAction';
import ErrorNotification from '../ErrorNotification';
import { logout, fetchUserInfo } from '../../utils/auth';
import { listItemStyle, listItemTextStyle } from './styles';

const MenuPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const u = fetchUserInfo();
        setUser(u);
    }, [user]);

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

            <Container maxWidth="md">
                <Box display="flex" justifyContent="space-between" padding="0.5rem">
                    <Typography variant="h6" style={{ color: '#747bff' }}>
                        Purchase Manager
                    </Typography>
                    <Box display="flex" alignItems="center">
                        {user && (
                            <Typography variant="body1" style={{ marginRight: '1rem' }}>
                                Hello, {user.email}
                            </Typography>
                        )}
                        <button onClick={logoutHandler}>Logout</button>
                    </Box>
                </Box>
                <List>
                    <MenuListItem path="/products">Products</MenuListItem>
                    <MenuListItem path="/customers">Customers</MenuListItem>
                    <MenuListItem path="/purchases">Purchases</MenuListItem>
                </List>
            </Container>
        </>
    );
};

export default MenuPage;