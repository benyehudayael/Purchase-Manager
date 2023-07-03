import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText } from '@material-ui/core';

const MenuPage = () => {
    return (
        <div>
            <h1>Menu</h1>
            <List component="nav">
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
        </div>
    );
};

export default MenuPage;
