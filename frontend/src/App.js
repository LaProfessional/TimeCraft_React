import Header from "./components/header/Header";
import Navigation from "./components/navigation/Navigation";
import Table from "./components/table/Table";
import TaskProvider from "./components/table/TaskProvider";

import React from "react";
import './styles/main.css';

const App = () => {
	return (
		<>
			<TaskProvider>
				<Header/>
				<Navigation/>
				<Table/>
			</TaskProvider>
		</>
	);
};

export default App;