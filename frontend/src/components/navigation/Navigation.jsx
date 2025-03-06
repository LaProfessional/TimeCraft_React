import React, { useContext, useEffect, useState } from 'react';
import Button from './Button';
import QuickSearch from "./QuickSearch";
import TasksSortOptions from "./TasksSortOptions";
import ModalWindow from "../modalWindows/ModalWindow";
import TaskCreationForm from "../modalWindows/TaskCreationForm";

import { SelectedTasksContext } from "../providers/SelectedTasksProvider";

import styles from './Navigation.module.css';

const Navigation = () => {
	const [ isModalOpen, setIsModalOpen ] = useState(false);
	const [ isClickBtnSave, setIsClickBtnSave ] = useState(false);

	const { selectedTaskIds } = useContext(SelectedTasksContext);

	const openModalWindow = () => setIsModalOpen(true);

	return (
		<>
			<ModalWindow
				isOpen={ isModalOpen }
				setIsOpen={ setIsModalOpen }
				title={ "Название задачи" }
				isClickBtnSave={ isClickBtnSave }
				setIsClickBtnSave={ setIsClickBtnSave }
			><TaskCreationForm
				isClickBtnSave={ isClickBtnSave }
				setIsClickBtnSave={ setIsClickBtnSave }
			/>
			</ModalWindow>

			<nav className={ styles.navContainer }>
				<h2 className={ styles.title }>Задачи N</h2>
				<div className={ styles.leftNavContainer }>
					<Button type='primary' onClick={ () => openModalWindow() }>Создать задачу</Button>
					<Button type='primary' disabled={ 1 !== selectedTaskIds.length }>Редактировать</Button>
					<Button type='danger' disabled={ !selectedTaskIds.length }>Удалить</Button>
					<QuickSearch placeholder='Поиск...' type='text'></QuickSearch>

					<div className={ styles.sortOptionsContainer }>
						<TasksSortOptions></TasksSortOptions>
					</div>
				</div>
				<div className={ styles.rightNavContainer }>
					<Button type='danger'>Выйти</Button>
				</div>
			</nav>
		</>
	);
};

export default Navigation;