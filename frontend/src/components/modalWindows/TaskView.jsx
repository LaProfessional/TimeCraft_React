import React, { useContext } from 'react';

import { TaskContext } from "../providers/TaskProvider";
import { SelectedTaskIdsContext } from "../providers/SelectedTaskIdsProvider";

import taskCreationForm from './TaskCreationForm.module.css';
import taskView from "./TaskView.module.css";

const TaskView = () => {

    const { taskList } = useContext(TaskContext);
    const { selectedTaskIds } = useContext(SelectedTaskIdsContext);

    return (
        <section className={ taskCreationForm.details }>
            <div className={ taskCreationForm.inputGroup }>
                <h2 className={ taskCreationForm.blockTitle }>Название задачи:</h2>
            </div>

            <div className={ taskCreationForm.inputGroup }>
                {/*<label className={ styles.blockTitle } htmlFor="description">Описание:</label>*/ }
                {/*<textarea*/ }
                {/*    className={ styles.description }*/ }
                {/*    placeholder="Описание"*/ }
                {/*    id="description"*/ }
                {/*    value={ taskData.description }*/ }
                {/*/>*/ }
            </div>

            <div className={ taskCreationForm.inputGroup }>
                <label className={ taskCreationForm.blockTitle } htmlFor="startDate">Дата начала:</label>
                <div className={ taskCreationForm.dateGroup }>
                    {/*<input*/ }
                    {/*    className={ styles.inputDatetime }*/ }
                    {/*    type="date"*/ }
                    {/*    min="2000-01-01"*/ }
                    {/*    max="2100-01-01"*/ }
                    {/*    id="startDate"*/ }
                    {/*    value={ taskData.startDate }*/ }
                    {/*    onChange={ handleChangeInput }*/ }
                    {/*/>*/ }
                    {/*<input*/ }
                    {/*    className={ styles.inputDatetime }*/ }
                    {/*    type="time"*/ }
                    {/*    id="startTime"*/ }
                    {/*    value={ taskData.startTime }*/ }
                    {/*/>*/ }
                </div>
            </div>

            <div className={ taskCreationForm.inputGroup }>
                <label className={ taskCreationForm.blockTitle } htmlFor="endDatetime">Дата окончания:</label>
                <div className={ taskCreationForm.dateGroup }>
                    {/*<input*/ }
                    {/*    className={ styles.inputDatetime }*/ }
                    {/*    type="date"*/ }
                    {/*    max="2100-01-01"*/ }
                    {/*    id="endDate"*/ }
                    {/*    value={ taskData.endDate }*/ }
                    {/*    onChange={ handleChangeInput }*/ }
                    {/*    onBlur={ e => handleChangeDate('endDate', e) }*/ }
                    {/*/>*/ }
                    {/*<input*/ }
                    {/*    className={ styles.inputDatetime }*/ }
                    {/*    type="time"*/ }
                    {/*    id="endTime"*/ }
                    {/*    value={ taskData.endTime }*/ }
                    {/*    onChange={ handleChangeInput }*/ }
                    {/*/>*/ }
                </div>
            </div>
        </section>
    );
};

export default TaskView;