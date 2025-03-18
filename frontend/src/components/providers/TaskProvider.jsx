import React, { createContext, useContext, useEffect, useState, useMemo, useRef } from 'react';

import useValidation from "../../hooks/useValidation";

import { SelectedTaskIdsContext } from "./SelectedTaskIdsProvider";
import { ModalModeContext } from "./ModalModeProvider";

import { url } from "../../constants";

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

    const { errors, setErrors, validate } = useValidation();

    const [ queryObject, setQueryObject ] = useState({});
    const [ tasksCount, setTasksCount ] = useState(0);
    const [ isDeleteAllTasks, setIsDeleteAllTasks ] = useState(false);

    let [ portionLength, setPortionLength ] = useState(0);

    const prevQueryObject = useRef(queryObject);

    const { selectedTaskIds, setSelectedTaskIds } = useContext(SelectedTaskIdsContext);
    const { modalMode } = useContext(ModalModeContext);

    const token = localStorage.getItem("userToken");

    const deleteTask = () => {
        fetch(`${ url }/tasks`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${ token }`,
            },
            body: JSON.stringify({ selectedTaskIds, isDeleteAllTasks, token }),
        }).then(() => {
            if (isDeleteAllTasks) {
                setTaskList([]);
                setTasksCount(0);
            } else {
                setTaskList(prevTaskList =>
                    prevTaskList.filter(task => !selectedTaskIds.includes(task.id))
                );
            }
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
        const queryString = generateQueryString(queryObject);
        portionLength = taskList.length;

        const isSorting = prevQueryObject.current !== queryObject;

        fetch(`${ url }/tasks?${ queryString }&portionLength=${ isSorting ? 0 : portionLength }`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${ token }`,
            },
        }).then(response => {
            return response.json();
        }).then(tasksRes => {
            const { tasks, portionLength, tasksCount } = tasksRes;

            setTasksCount(tasksCount);
            setPortionLength(portionLength);
            setTaskList(prevTasks => (isSorting ? [ ...tasks ] : [ ...prevTasks, ...tasks ]));

            prevQueryObject.current = queryObject;
        });
    };
    useEffect(() => getTasks(), [ queryObject ]);


    const handleSaveTask = () => {
        const isInvalid = validate(taskData, [ "description" ]);
        if (isInvalid) return isInvalid;

        const startDatetime = new Date(`${ taskData.startDate } ${ taskData.startTime }`).toISOString();
        const endDatetime = new Date(`${ taskData.endDate } ${ taskData.endTime }`).toISOString();

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
        fetch(`${ url }/tasks`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${ token }`,
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
        fetch(`${ url }/tasks/?taskId=${ taskId }`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${ token }`,
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
        portionLength,
        tasksCount,
        errors,
        setErrors,
    }), [ taskList, deleteTask ]);

    const taskActionsValue = useMemo(() => ({
        taskData,
        setTaskData,
        setQueryObject,
        setIsDeleteAllTasks,
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