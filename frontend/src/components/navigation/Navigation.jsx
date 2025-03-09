import React, { useContext, useState, useMemo } from 'react';
import Button from './Button';
import QuickSearch from "./QuickSearch";
import TasksSortOptions from "./TasksSortOptions";
import ModalWindow from "../modalWindows/ModalWindow";
import TaskCreationForm from "../modalWindows/TaskCreationForm";

import { SelectedTaskIdsContext } from "../providers/SelectedTaskIdsProvider";
import { TaskContext } from "../providers/TaskProvider";
import { CurrentTaskIdContext } from "../providers/TaskIdProvider";

import styles from './Navigation.module.css';

const Navigation = () => {
	const [ isModalOpen, setIsModalOpen ] = useState(false);
	const [ isClickBtnSave, setIsClickBtnSave ] = useState(false);
	const [ modalMode, setModalMode ] = useState('create');

	const modalTitle = modalMode === "create" ? "Новая задача" : "Редактирование задачи";
	const buttonText = modalMode === "create" ? "Сохранить" : "Редактировать";

	const { selectedTaskIds, setSelectedTaskIds } = useContext(SelectedTaskIdsContext);
	const { taskList, setTaskList } = useContext(TaskContext);
	const { setCurrentTaskId } = useContext(CurrentTaskIdContext);

	const openModalWindow = () => setIsModalOpen(true);

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

	const memoizedTaskCreationForm = useMemo(() => (
		<TaskCreationForm
			isClickBtnSave={ isClickBtnSave }
			setIsClickBtnSave={ setIsClickBtnSave }
			setIsModalOpen={ setIsModalOpen }
		/>
	), [ isClickBtnSave ]);

	return (
		<>
			<ModalWindow
				isModalOpen={ isModalOpen }
				setIsModalOpen={ setIsModalOpen }

				modalTitle={ modalTitle }
				buttonText={ buttonText }

				isClickBtnSave={ isClickBtnSave }
				setIsClickBtnSave={ setIsClickBtnSave }
			>{ memoizedTaskCreationForm }</ModalWindow>

			<nav className={ styles.navContainer }>
				<h2 className={ styles.title }>Задачи N</h2>
				<div className={ styles.leftNavContainer }>

					<Button type="primary" onClick={ () => {
						openModalWindow();
						setModalMode("create");
					} }>Создать задачу</Button>

					<Button
						type="primary"
						disabled={ 1 !== selectedTaskIds.length }
						onClick={ () => {
							setCurrentTaskId(taskList.filter(task => task.id === selectedTaskIds[0]));
							setModalMode("edit");
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