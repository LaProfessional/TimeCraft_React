import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AuthenticatedProvider from "./components/providers/AuthenticatedProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthenticatedProvider>
        <App/>
    </AuthenticatedProvider>
);

