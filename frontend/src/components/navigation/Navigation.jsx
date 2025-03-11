import React, { useContext, useState, useMemo } from 'react';
import Button from './Button';
import QuickSearch from "./QuickSearch";
import TasksSortOptions from "./TasksSortOptions";
import ModalWindow from "../modalWindows/ModalWindow";
import TaskCreationForm from "../modalWindows/TaskCreationForm";
import TaskView from "../modalWindows/TaskView";

import { SelectedTaskIdsContext } from "../providers/SelectedTaskIdsProvider";
import { TaskContext } from "../providers/TaskProvider";
import { CurrentTaskIdContext } from "../providers/TaskIdProvider";
import { ModalModeContext } from "../providers/ModalModeProvider";

import styles from './Navigation.module.css';

const Navigation = () => {
    const [ isClickBtnSave, setIsClickBtnSave ] = useState(false);

    const { selectedTaskIds, setSelectedTaskIds } = useContext(SelectedTaskIdsContext);
    const { taskList, setTaskList } = useContext(TaskContext);
    const { setCurrentTaskId } = useContext(CurrentTaskIdContext);
    const { modalMode, setModalMode, isModalOpen, setIsModalOpen } = useContext(ModalModeContext);

    const deleteTask = () => {
        fetch('http://localhost:5000/tasks', {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ selectedTaskIds }),

        }).then(() => setTaskList(prevTaskList => {
            const updateTaskList = prevTaskList.filter(task => !selectedTaskIds.includes(task.id));
            setSelectedTaskIds([]);
            return updateTaskList;
        }));
    };

    const memoizedTaskCreationForm = useMemo(() => {
        if (modalMode.type === "view") {
            return <TaskView/>
        } else {
            return (
                <TaskCreationForm
                    isClickBtnSave={ isClickBtnSave }
                    setIsClickBtnSave={ setIsClickBtnSave }
                />
            );
        }
    }, [ isClickBtnSave, isModalOpen, modalMode ]);

    return (
        <>
            <ModalWindow
                isClickBtnSave={ isClickBtnSave }
                setIsClickBtnSave={ setIsClickBtnSave }
            >{ memoizedTaskCreationForm }</ModalWindow>

            <nav className={ styles.navContainer }>
                <h2 className={ styles.title }>Задачи N</h2>
                <div className={ styles.leftNavContainer }>

                    <Button type="primary" onClick={ () => {
                        setIsModalOpen(true);
                        setModalMode("create");
                    } }>Создать задачу</Button>

                    <Button
                        type="primary"
                        disabled={ 1 !== selectedTaskIds.length }
                        onClick={ () => {
                            setCurrentTaskId(taskList.filter(task => task.id === selectedTaskIds[0]));
                            setModalMode("edit");
                            setIsModalOpen(true);
                        } }
                    >Редактировать</Button>

                    <Button
                        type="danger"
                        disabled={ !selectedTaskIds.length }
                        onClick={ deleteTask }
                    >Удалить</Button>

                    <QuickSearch placeholder="Поиск..." type="text"></QuickSearch>

                    <div className={ styles.sortOptionsContainer }>
                        <TasksSortOptions></TasksSortOptions>
                    </div>
                </div>
                <div className={ styles.rightNavContainer }>
                    <Button type="danger">Выйти</Button>
                </div>
            </nav>
        </>
    );
};

export default Navigation;