import Header from "./components/header/Header";
import Navigation from "./components/navigation/Navigation";
import Table from "./components/table/Table";

import TaskProvider from "./components/providers/TaskProvider";
import SelectedTasksProvider from "./components/providers/SelectedTasksProvider";

import React from "react";
import './styles/main.css';

const App = () => {
	return (
		<>
			<SelectedTasksProvider>
				<TaskProvider>
					<Header/>
					<Navigation/>
					<Table/>
				</TaskProvider>
			</SelectedTasksProvider>
		</>
	);
};

export default App;