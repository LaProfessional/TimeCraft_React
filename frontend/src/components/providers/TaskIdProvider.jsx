import React, { createContext, useState } from 'react';

export const CurrentTaskIdContext = createContext();

const TaskIdProvider = ({ children }) => {
	const [ currentTaskId, setCurrentTaskId ] = useState(null);
	return (
		<CurrentTaskIdContext.Provider value={ { currentTaskId, setCurrentTaskId } }>
			{ children }
		</CurrentTaskIdContext.Provider>
	);
};

export default TaskIdProvider;