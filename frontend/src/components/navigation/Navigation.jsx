import React, { useContext, useMemo } from "react";

import Button from "./Button";
import QuickSearch from "./QuickSearch";
import SortOptions from "./SortOptions";
import ModalWindow from "../modalWindow/ModalWindow";
import TaskCreationForm from "../modalWindow/TaskCreationForm";
import TaskView from "../modalWindow/TaskView";

import { SelectedTaskIdsContext } from "../providers/SelectedTaskIdsProvider";
import { TaskContext } from "../providers/TaskProvider";
import { ModalModeContext } from "../providers/ModalModeProvider";
import { AuthenticatedContext } from "../providers/AuthenticatedProvider";

import styles from './Navigation.module.css';

const Navigation = () => {
    const { selectedTaskIds } = useContext(SelectedTaskIdsContext);
    const { resetForm, deleteTask, tasksCount, taskList } = useContext(TaskContext);
    const { modalMode, setModalMode, isModalOpen, setIsModalOpen } = useContext(ModalModeContext);
    const { setIsAuthenticated } = useContext(AuthenticatedContext);

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
                        <SortOptions></SortOptions>
                    </div>
                </div>
                <div className={ styles.rightNavContainer }>
                    <Button type="danger" onClick={ () => {
                        localStorage.removeItem("userToken");
                        setIsAuthenticated(false);
                    } }>Выйти</Button>
                </div>
            </nav>
        </>
    );
};

export default Navigation;