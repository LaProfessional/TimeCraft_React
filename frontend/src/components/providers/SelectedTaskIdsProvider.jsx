import React, { createContext, useState } from 'react';

export const SelectedTaskIdsContext = createContext();

const SelectedTaskIdsProvider = ({ children }) => {
	const [ selectedTaskIds, setSelectedTaskIds ] = useState([]);

	return (
		<SelectedTaskIdsContext value={ { selectedTaskIds, setSelectedTaskIds } }>
			{ children }
		</SelectedTaskIdsContext>
	);
};

export default SelectedTaskIdsProvider;