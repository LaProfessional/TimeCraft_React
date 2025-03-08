import Header from "./components/header/Header";
import Navigation from "./components/navigation/Navigation";
import Table from "./components/table/Table";

import TaskProvider from "./components/providers/TaskProvider";
import SelectedTaskIdsProvider from "./components/providers/SelectedTaskIdsProvider";
import TaskIdProvider from "./components/providers/TaskIdProvider";

import React from "react";
import './styles/main.css';

const App = () => {
	return (
		<>
			<TaskIdProvider>
				<SelectedTaskIdsProvider>
					<TaskProvider>
						<Header/>
						<Navigation/>
						<Table/>
					</TaskProvider>
				</SelectedTaskIdsProvider>
			</TaskIdProvider>
		</>
	);
};

export default App;