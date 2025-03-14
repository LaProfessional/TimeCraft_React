import React, { useContext } from 'react';

import { TaskActionsContext } from "../providers/TaskProvider";

import styles from "./TasksSortOptions.module.css";

const TasksSortOptions = React.memo(() => {
    const { setQueryObject } = useContext(TaskActionsContext);

    const sortTasks = e => {
        const [ field, order ] = e.target.value.split('|');
        const sort = { field, order };
        setQueryObject(sort);
    };

    return (
        <>
            <label htmlFor="sortOptions" className={ styles.sortLabel }>Сортировать по:</label>
            <select
                className={ styles.sortOptions }
                id='sortOptions'
                onChange={ sortTasks }
            >
                <option value='creation_datetime|asc'>Дате создания (по возрастанию)</option>
                <option value='creation_datetime|desc'>Дате создания (по убыванию)</option>
                <option value='title|asc'>Названию (по возрастанию)</option>
                <option value='title|desc'>Названию (по убыванию)</option>
                <option value='start_datetime|asc'>Дате начала (по возрастанию)</option>
                <option value='start_datetime|desc'>Дате начала (по убыванию)</option>
                <option value='end_datetime|asc'>Дате окончания (по возрастанию)</option>
                <option value='end_datetime|desc'>Дате окончания (по убыванию)</option>
            </select>
        </>
    );
});

export default TasksSortOptions;