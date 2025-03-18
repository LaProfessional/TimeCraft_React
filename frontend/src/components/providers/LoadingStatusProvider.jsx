import React, { createContext, useState } from 'react';

export const LoadingStatusContext = createContext();

const LoadingStatusProvider = ({ children }) => {
    const [ isMounted, setIsMounted ] = useState(false);

    return (
        <LoadingStatusContext.Provider value={ { isMounted, setIsMounted } }>
            { children }
        </LoadingStatusContext.Provider>
    );
};

export default LoadingStatusProvider;