import React, { createContext, useState } from 'react';

export const SelectedTaskIdsContext = createContext();

const SelectedTaskIdsProvider = ({ children }) => {
	const [ selectedTaskIds, setSelectedTaskIds ] = useState([]);

	return (
		<SelectedTaskIdsContext.Provider value={ { selectedTaskIds, setSelectedTaskIds } }>
			{ children }
		</SelectedTaskIdsContext.Provider>
	);
};

export default SelectedTaskIdsProvider;