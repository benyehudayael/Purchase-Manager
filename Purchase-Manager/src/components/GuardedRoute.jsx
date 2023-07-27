import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';

import NoAccess from './NoAccess';

const GuardedRoute = ({ path, element, roles }) => {
    const userRole = useSelector((state) => state.userRole);

    if (roles.includes(userRole)) {
        return <Route path={path} element={element} />;
    } else {
        return <Route path={path} element={<NoAccess />} />;
    }
};


export default GuardedRoute;
