import React, { createContext, useState } from 'react';

export const SelectedTasksContext = createContext();

const SelectedTasksProvider = ({ children }) => {
	const [ selectedTaskIds, setSelectedTaskIds ] = useState([]);

	return (
		<SelectedTasksContext.Provider value={ { selectedTaskIds, setSelectedTaskIds } }>
			{ children }
		</SelectedTasksContext.Provider>
	);
};

export default SelectedTasksProvider;