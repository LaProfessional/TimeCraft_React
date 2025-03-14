import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';

import { SelectedTaskIdsContext } from "./SelectedTaskIdsProvider";
import { ModalModeContext } from "./ModalModeProvider";

export const TaskContext = createContext();
export const TaskActionsContext = createContext();

const TaskProvider = ({ children }) => {
    const [ taskList, setTaskList ] = useState([]);
    const [ taskData, setTaskData ] = useState({
        title: '',
        description: '',
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
    });
    const [ queryObject, setQueryObject ] = useState({});

    const { selectedTaskIds, setSelectedTaskIds } = useContext(SelectedTaskIdsContext);
    const { modalMode } = useContext(ModalModeContext);

    const deleteTask = () => {
        fetch('http://localhost:5000/tasks', {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ selectedTaskIds }),
        }).then(() => {
            setTaskList(prevTaskList =>
                prevTaskList.filter(task => !selectedTaskIds.includes(task.id))
            );
            setSelectedTaskIds([]);
        });
    };

    const generateQueryString = params => {
        const urlParams = new URLSearchParams;

        Object.entries(params).forEach(([ key, value ]) => {
            if (value != null) urlParams.append(key, value);
        });
        return urlParams.toString();
    };

    const getTasks = () => {
        const queryString = generateQueryString({ ...queryObject });

        fetch(`http://localhost:5000/tasks?${ queryString }`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            },
        }).then(response => {
            return response.json();
        }).then(tasks => setTaskList(tasks));
    };
    useEffect(() => getTasks(), [ queryObject ]);

    const handleSaveTask = () => {
        const startDatetime = new Date(`${ taskData.startDate } ${ taskData.startTime }`).toISOString();
        const endDatetime = taskData.endDate && taskData.endTime
            ? new Date(`${ taskData.endDate } ${ taskData.endTime }`).toISOString()
            : null;

        const task = {
            title: taskData.title,
            description: taskData.description,
            startDatetime,
            endDatetime,
        };

        if (modalMode.type === "edit") {
            updateTask(task, selectedTaskIds[0]);
        } else {
            createTask(task);
        }
    };

    const createTask = task => {
        fetch('http://localhost:5000/tasks', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ task }),

        }).then(response => {
            return response.json();

        }).then(task => {
            setTaskList(prev => [ ...prev, task ]);
            resetForm();
        });
    };

    const updateTask = (task, taskId) => {
        fetch(`http://localhost:5000/tasks/?taskId=${ taskId }`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ task }),

        }).then(response => {
            return response.json();
        }).then(updateTask => {
            setTaskList(prevTasks => prevTasks.map(task => task.id === updateTask.id ? updateTask : task));
            setSelectedTaskIds([]);
            resetForm();
        });
    };

    const resetForm = () => {
        setTaskData(prev => ({
            ...prev,
            title: '',
            description: '',
            endDate: '',
            endTime: '',
        }));
        setDefaultStartDatetime();
    };

    const setDefaultStartDatetime = () => {
        const currentDate = new Date();
        const defaultDate = currentDate.toISOString().slice(0, 10);

        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const defaultTime = `${ hours }:${ minutes }`;

        setTaskData(prev => ({
            ...prev,
            startDate: defaultDate,
            startTime: defaultTime,
        }));
    };
    useEffect(() => setDefaultStartDatetime(), []);

    const populateTaskData = () => {
        const task = taskList.filter(task => task.id === selectedTaskIds[0]);
        const {
            title,
            description,
            startDatetime,
            endDatetime,
        } = task[0];

        setTaskData(() => ({
            title: title,
            description: description,
            startDate: startDatetime.split('T')[0],
            startTime: new Date(startDatetime).toTimeString().slice(0, 8),
            endDate: endDatetime.split('T')[0],
            endTime: new Date(endDatetime).toTimeString().slice(0, 8),
        }));
    };

    useEffect(() => {
        if (modalMode.type === "edit") populateTaskData();
    }, [ modalMode ]);

    const taskContextValue = useMemo(() => ({
        getTasks,
        deleteTask,
        createTask,
        handleSaveTask,
        resetForm,
        taskList,
        setTaskList,
    }), [ taskList, deleteTask ]);

    const taskActionsValue = useMemo(() => ({
        taskData,
        setTaskData,
        setQueryObject,
    }), [ taskData ]);

    return (
        <TaskContext.Provider value={ taskContextValue }>
            <TaskActionsContext.Provider value={ taskActionsValue }>
                { children }
            </TaskActionsContext.Provider>
        </TaskContext.Provider>
    );
};

export default TaskProvider;