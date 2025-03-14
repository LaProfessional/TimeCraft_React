import React, { useContext } from 'react';

import { TaskActionsContext } from "../providers/TaskProvider";

import styles from "./QuickSearch.module.css";

const QuickSearch = React.memo(({ type = 'text', placeholder = 'Поиск...' }) => {
    const { setQueryObject } = useContext(TaskActionsContext);

    let searchTimeoutId;
    const inputHandler = e => {
        clearTimeout(searchTimeoutId);

        searchTimeoutId = setTimeout(() => {
            const search = e.target.value.trim();
            sortTasks(search);
        }, 500);
    };

    const sortTasks = search => {
        clearTimeout(searchTimeoutId);
        setQueryObject({ search });
    };

    return (
        <input
            className={ styles.quickSearch }
            placeholder={ placeholder }
            type={ type }
            onInput={ inputHandler }
            onBlur={ e => sortTasks(e.target.value) }
            onKeyDown={ e => {
                if (e.key === 'Enter') sortTasks(e.target.value);
            } }
        />
    );
});

export default QuickSearch;