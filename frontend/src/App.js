import React, { useContext } from "react";

import Header from "./components/header/Header";
import Navigation from "./components/navigation/Navigation";
import Table from "./components/table/Table";
import RegistrationPage from "./components/login/RegistrationPage";

import TaskProvider from "./components/providers/TaskProvider";
import SelectedTaskIdsProvider from "./components/providers/SelectedTaskIdsProvider";
import ModalModeProvider from "./components/providers/ModalModeProvider";

import { AuthenticatedContext } from "./components/providers/AuthenticatedProvider";

import './styles/main.css';

const App = () => {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthenticatedContext);

    return (
        <>
            { !isAuthenticated ? (<RegistrationPage setIsAuthenticated={ setIsAuthenticated }/>) : (
                <ModalModeProvider>
                    <SelectedTaskIdsProvider>
                        <TaskProvider>
                            <Header/>
                            <Navigation/>
                            <Table/>
                        </TaskProvider>
                    </SelectedTaskIdsProvider>
                </ModalModeProvider>
            ) }
        </>
    );
};

export default App;