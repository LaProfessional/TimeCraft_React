import React, { useContext, useRef } from 'react';

import { TaskActionsContext } from "../providers/TaskProvider";

import styles from "./QuickSearch.module.css";

const QuickSearch = React.memo(({ type = 'text', placeholder = 'Поиск...' }) => {
    const { setQueryObject } = useContext(TaskActionsContext);
    const inputRef = useRef();

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

        if (inputRef.current === search) return;
        inputRef.current = search;

        setQueryObject({ search });
    };

    return (
        <input
            className={ styles.quickSearch }
            placeholder={ placeholder }
            type={ type }
            ref={ inputRef }
            onInput={ inputHandler }
            onBlur={ e => {
                if (!e.target.value) return;
                sortTasks(e.target.value.trim());
            } }
            onKeyUp={ e => {
                if (e.key === 'Enter') sortTasks(e.target.value.trim());
            } }
        />
    );
});

export default QuickSearch;