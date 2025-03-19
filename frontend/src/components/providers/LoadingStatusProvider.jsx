import React, { createContext, useState } from 'react';

export const LoadingStatusContext = createContext();

const LoadingStatusProvider = ({ children }) => {
    const [ isLoading, setIsLoading ] = useState(true);

    return (
        <LoadingStatusContext.Provider value={ { isLoading, setIsLoading } }>
            { children }
        </LoadingStatusContext.Provider>
    );
};

export default LoadingStatusProvider;