import React from 'react';
import { Typography, Box } from '@mui/material';

const NoAccess = () => {
    return (
        <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" component="h2" mb={2}>No Access</Typography>
            <Typography variant="body1" component="p">
                You do not have permission to access this page.
            </Typography>
        </Box>
    );
};

export default NoAccess;
