import React, { useContext, useMemo } from "react";

import Button from "./Button";
import QuickSearch from "./QuickSearch";
import TasksSortOptions from "./TasksSortOptions";
import ModalWindow from "../modalWindows/ModalWindow";
import TaskCreationForm from "../modalWindows/TaskCreationForm";
import TaskView from "../modalWindows/TaskView";

import { SelectedTaskIdsContext } from "../providers/SelectedTaskIdsProvider";
import { TaskContext } from "../providers/TaskProvider";
import { ModalModeContext } from "../providers/ModalModeProvider";

import styles from './Navigation.module.css';

const Navigation = () => {
    const { selectedTaskIds } = useContext(SelectedTaskIdsContext);
    const { resetForm, deleteTask, tasksCount, taskList } = useContext(TaskContext);
    const { modalMode, setModalMode, isModalOpen, setIsModalOpen } = useContext(ModalModeContext);

    const memoizedTaskCreationForm = useMemo(() => {
        if (modalMode.type === "view") {
            return <TaskView/>
        } else {
            return <TaskCreationForm/>
        }
    }, [ isModalOpen, modalMode ]);

    return (
        <>
            <ModalWindow>{ memoizedTaskCreationForm }</ModalWindow>

            <nav className={ styles.navContainer }>
                <h2 className={ styles.title }>Задачи: { taskList.length ? tasksCount : 0 }</h2>
                <div className={ styles.leftNavContainer }>

                    <Button type="primary" onClick={ () => {
                        setIsModalOpen(true);
                        setModalMode("create");
                        resetForm();
                    } }>Создать задачу</Button>

                    <Button
                        type="primary"
                        disabled={ 1 !== selectedTaskIds.length }
                        onClick={ () => {
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