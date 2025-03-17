import React, { createContext, useState } from 'react';

export const AuthenticatedContext = createContext();

const AuthenticatedProvider = ({ children }) => {
    const [ isAuthenticated, setIsAuthenticated ] = useState(false);

    return (
        <AuthenticatedContext.Provider value={ { isAuthenticated, setIsAuthenticated } }>
            { children }
        </AuthenticatedContext.Provider>
    );
};

export default AuthenticatedProvider;