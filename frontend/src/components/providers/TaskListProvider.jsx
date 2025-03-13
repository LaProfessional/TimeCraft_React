import React, { createContext, useState } from 'react';

export const TaskContext = createContext();

const TaskListProvider = ({ children }) => {
	const [taskList, setTaskList] = useState([]);

	return (
		<TaskContext.Provider value={ { taskList, setTaskList } }>
			{ children }
		</TaskContext.Provider>
	);
};

export default TaskListProvider;