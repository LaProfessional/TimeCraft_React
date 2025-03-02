import React, { useState } from 'react';
import Button from './Button';
import QuickSearch from "./QuickSearch";
import TasksSortOptions from "./TasksSortOptions";

import styles from './Navigation.module.css';
import TaskCreateModal from "../modalWindows/TaskCreateModal";

const Navigation = () => {

	const [ isOpen, setIsOpen ] = useState(false);

	const openTaskCreateModal = () => setIsOpen(true);

	return (
		<>
			<TaskCreateModal isOpen={isOpen} setIsOpen={setIsOpen}></TaskCreateModal>

			<nav className={ styles.navContainer }>
				<h2 className={ styles.title }>Задачи N</h2>
				<div className={ styles.leftNavContainer }>
					<Button type='primary' onClick={ openTaskCreateModal }>Создать задачу</Button>

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