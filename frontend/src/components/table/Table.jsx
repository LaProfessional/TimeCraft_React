import React, { useContext } from 'react';
import TaskTableCell from "./TaskTableCell";

import { TaskContext } from "../providers/TaskProvider";
import { SelectedTaskIdsContext } from "../providers/SelectedTaskIdsProvider";

import styles from './Table.module.css';

const Table = () => {
    const { taskList } = useContext(TaskContext);
    const { selectedTaskIds, setSelectedTaskIds } = useContext(SelectedTaskIdsContext);

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
        } else {
            setSelectedTaskIds(taskList.map(task => task.id));
        }
    };

    const selectedTask = taskId => {
        setSelectedTaskIds(prevSelected => {
            return prevSelected.includes(taskId)
                ? prevSelected.filter(id => id !== taskId)
                : [ ...prevSelected, taskId ];
        });
    };

    return (
        <div className={ styles.tableContainer }>
            <div className={ styles.table }>
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

                { taskList.map(task => {
                    const { id, title, description, startDatetime, endDatetime } = task;

                    return (
                        <div className={ styles.tableBody } key={ id }>
                            <div className={ styles.tableRow }>
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
                        </div>
                    );
                }) }
            </div>
        </div>
    );
};

export default Table;