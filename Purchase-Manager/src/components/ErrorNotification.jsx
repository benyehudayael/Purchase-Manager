import React from 'react';
import PropTypes from 'prop-types';
import { Alert, AlertTitle } from '@mui/material';

const ErrorNotification = ({ message, onClose }) => (
    <Alert severity="error" onClose={onClose}>
        <AlertTitle>Error</AlertTitle>
        {message}
    </Alert>
);

ErrorNotification.propTypes = {
    message: PropTypes.string.isRequired,
    onClose: PropTypes.func,
};

export default ErrorNotification;