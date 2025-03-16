import React, { useContext } from 'react';

import { TaskContext } from "../providers/TaskProvider";
import { SelectedTaskIdsContext } from "../providers/SelectedTaskIdsProvider";

import styles from './TaskCreationForm.module.css';

const TaskView = () => {
    const { taskList } = useContext(TaskContext);
    const { selectedTaskIds } = useContext(SelectedTaskIdsContext);

    const task = taskList.filter(task => task.id === selectedTaskIds[0]);

    if (!task.length) return;

    const {
        title,
        description,
        startDatetime,
        endDatetime,
    } = task[0];

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

    return (
        <section className={ styles.details }>
            <div className={ styles.contentGroup }>
                <h2 className={ styles.blockTitle }>Название задачи:</h2>
                <p className={ styles.content }>{ title }</p>
            </div>

            <div className={ styles.contentGroup }>
                <h2 className={ styles.blockTitle }>Описание:</h2>
                <p className={ styles.content }>{ description }</p>
            </div>

            <div className={ styles.contentGroup }>
                <h2 className={ styles.blockTitle }>Дата начала:</h2>
                <time className={ styles.content }>{ formattedDate(startDatetime) }</time>
            </div>

            <div className={ styles.contentGroup }>
                <h2 className={ styles.blockTitle }>Дата окончания:</h2>
                <time className={ styles.content }>{ formattedDate(endDatetime) }</time>
            </div>
        </section>
    );
};

export default TaskView;