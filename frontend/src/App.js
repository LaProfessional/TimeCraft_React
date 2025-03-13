import Header from "./components/header/Header";
import Navigation from "./components/navigation/Navigation";
import Table from "./components/table/Table";

import TaskListProvider from "./components/providers/TaskListProvider";
import SelectedTaskIdsProvider from "./components/providers/SelectedTaskIdsProvider";
import ModalModeProvider from "./components/providers/ModalModeProvider";

import React from "react";
import './styles/main.css';

const App = () => {
    return (
        <>
            <ModalModeProvider>
                <SelectedTaskIdsProvider>
                    <TaskListProvider>
                        <Header/>
                        <Navigation/>
                        <Table/>
                    </TaskListProvider>
                </SelectedTaskIdsProvider>
            </ModalModeProvider>
        </>
    );
};

export default App;