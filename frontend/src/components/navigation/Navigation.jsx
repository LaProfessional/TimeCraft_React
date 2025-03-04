import React, { useState } from 'react';
import Button from './Button';
import QuickSearch from "./QuickSearch";
import TasksSortOptions from "./TasksSortOptions";

import styles from './Navigation.module.css';
import ModalWindow from "../modalWindows/ModalWindow";
import TaskCreationForm from "../modalWindows/TaskCreationForm";

const Navigation = () => {

	const [ isModalOpen, setIsModalOpen ] = useState(false);

	const [ isClickBtnSave, setIsClickBtnSave ] = useState(false);

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
					<Button
						type='primary'
						onClick={ () => {
							openModalWindow();
						} }
					>Создать задачу</Button>

					<Button type='primary'>Редактировать</Button>
					<Button type='danger'>Удалить</Button>
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