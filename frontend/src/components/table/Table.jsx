import React, { useContext, useEffect, useRef } from 'react';
import TaskTableCell from "./TaskTableCell";
import AuthorLink from "./AuthorLink";

import { TaskContext } from "../providers/TaskProvider";
import { TaskActionsContext } from "../providers/TaskProvider";
import { SelectedTaskIdsContext } from "../providers/SelectedTaskIdsProvider";
import styles from './Table.module.css';

const Table = () => {
    const { taskList, getTasks, portionLength } = useContext(TaskContext);
    const { setIsDeleteAllTasks } = useContext(TaskActionsContext);
    const { selectedTaskIds, setSelectedTaskIds } = useContext(SelectedTaskIdsContext);

    const lastTask = useRef(null);

    const formattedDate = dateTime => {
        return new Intl.DateTimeFormat(navigator.language, {
            year: 'numeric',
            month: 'short',
            weekday: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        }).format(new Date(dateTime));
    };

    const selectedAllTasks = () => {
        if (selectedTaskIds.length === taskList.length) {
            setSelectedTaskIds([]);
            setIsDeleteAllTasks(false);
        } else {
            setSelectedTaskIds(taskList.map(task => task.id));
            setIsDeleteAllTasks(true);
        }
    };

    const selectedTask = taskId => {
        setSelectedTaskIds(prevSelected => {
            return prevSelected.includes(taskId)
                ? prevSelected.filter(id => id !== taskId)
                : [ ...prevSelected, taskId ];
        });
    };

    useEffect(() => {
        if (taskList.length < 20) return;

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    observer.unobserve(entry.target);
                    getTasks();
                }
            });
        }, { threshold: 0.1 });

        if (lastTask.current) observer.observe(lastTask.current);
        if (parseInt(portionLength) === taskList.length) observer.disconnect();
    }, [ taskList.length ]);

    return (
        <>
            <div className={ styles.tableContainer }>
                <div className={ styles.tableHeaderContainer }>
                    <div className={ styles.tableHeaderRow }>
                        <div className={ styles.tableHeaderCell }>
                            <input
                                className={ styles.headerCheckbox }
                                type="checkbox"
                                onChange={ () => selectedAllTasks() }
                                checked={ selectedTaskIds.length === taskList.length && taskList.length !== 0 }
                            />
                        </div>
                        <div className={ styles.tableHeaderCell }>Название</div>
                        <div className={ styles.tableHeaderCell }>Описание</div>
                        <div className={ styles.tableHeaderCell }>Дата начала</div>
                        <div className={ styles.tableHeaderCell }>Дата окончания</div>
                    </div>
                </div>

                <div className={ styles.tableBodyContainer }>
                    { taskList.map((task, index) => {
                        const { id, title, description, startDatetime, endDatetime } = task;

                        return (
                            <div
                                className={ styles.tableRow }
                                ref={ index === taskList.length - 1 ? lastTask : null }
                                key={ id }
                            >
                                <div className={ styles.tableCell }>
                                    <input
                                        className={ styles.checkbox }
                                        type='checkbox'
                                        onChange={ () => selectedTask(id) }
                                        checked={ selectedTaskIds.includes(id) }
                                    />
                                </div>
                                <TaskTableCell id={ id }>{ title }</TaskTableCell>
                                <TaskTableCell id={ id }>{ description }</TaskTableCell>
                                <TaskTableCell id={ id }>{ formattedDate(startDatetime) }</TaskTableCell>
                                <TaskTableCell id={ id }>{ formattedDate(endDatetime) }</TaskTableCell>
                            </div>
                        );
                    }) }
                </div>
            </div>
            { taskList.length ? '' : <h2 className={ styles.noTasksMessage }>Задачи не найдены</h2> }
            <AuthorLink>Created by: TopTTeDHbIu-DeJLbFuH4uk</AuthorLink>
        </>
    );
};

export default Table;