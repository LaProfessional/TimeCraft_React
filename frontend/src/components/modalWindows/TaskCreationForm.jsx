import React, { useContext } from 'react';

import { TaskActionsContext } from "../providers/TaskProvider";

import styles from "./TaskCreationForm.module.css";

const TaskCreationForm = () => {
    const { taskData, setTaskData } = useContext(TaskActionsContext);
    const {
        title,
        description,
        startDate,
        startTime,
        endDate,
        endTime,
    } = taskData;

    const handleChangeDate = (inputId, e) => {
        const currentYear = parseInt(e.target.value.slice(0, 4));

        switch (inputId) {
            case 'startDate':
                if (2100 < currentYear || 2000 > currentYear || !e.target.value) {
                    const defaultDate = new Date();

                    setTaskData(prev => ({
                        ...prev,
                        startDate: defaultDate.toISOString().slice(0, 10),
                    }));
                }
                break;
            case 'endDate':
                const minYear = parseInt(startDate.slice(0, 4));

                if (2100 < currentYear || minYear > currentYear) {
                    setTaskData(prev => ({
                        ...prev,
                        endDate: startDate,
                    }));
                }
                break;
            default:
        }
    };

    const handleChangeInput = e => {
        const { id, value } = e.target;
        setTaskData(prev => ({
            ...prev,
            [id]: value,
        }));
    };

    return (
        <form className={ styles.details }>
            <div className={ styles.inputGroup }>
                <label className={ styles.blockTitle } htmlFor="title">Название задачи:</label>
                <input
                    className={ styles.input }
                    type="text" placeholder="Задача"
                    id="title"
                    value={ title }
                    onChange={ handleChangeInput }
                />
            </div>

            <div className={ styles.inputGroup }>
                <label className={ styles.blockTitle } htmlFor="description">Описание:</label>
                <textarea
                    className={ styles.description }
                    placeholder="Описание"
                    id="description"
                    value={ description }
                    onChange={ handleChangeInput }
                />
            </div>

            <div className={ styles.inputGroup }>
                <label className={ styles.blockTitle } htmlFor="startDate">Дата начала:</label>
                <div className={ styles.dateGroup }>
                    <input
                        className={ styles.inputDatetime }
                        type="date"
                        min="2000-01-01"
                        max="2100-01-01"
                        id="startDate"
                        value={ startDate }
                        onChange={ handleChangeInput }
                        onBlur={ e => handleChangeDate('startDate', e) }
                    />
                    <input
                        className={ styles.inputDatetime }
                        type="time"
                        id="startTime"
                        value={ startTime }
                        onChange={ handleChangeInput }
                    />
                </div>
            </div>

            <div className={ styles.inputGroup }>
                <label className={ styles.blockTitle } htmlFor="endDatetime">Дата окончания:</label>
                <div className={ styles.dateGroup }>
                    <input
                        className={ styles.inputDatetime }
                        type="date"
                        max="2100-01-01"
                        id="endDate"
                        value={ endDate }
                        onChange={ handleChangeInput }
                        onBlur={ e => handleChangeDate('endDate', e) }
                    />
                    <input
                        className={ styles.inputDatetime }
                        type="time"
                        id="endTime"
                        value={ endTime }
                        onChange={ handleChangeInput }
                    />
                </div>
            </div>
        </form>
    );
};

export default TaskCreationForm;