import React from 'react';
import Button from './Button';
import QuickSearch from "./QuickSearch";
import TasksSortOptions from "./TasksSortOptions";

import styles from './Navigation.module.css';

const Navigation = () => {
	return (
		<nav className={ styles.navContainer }>
			<h2 className={ styles.title }>Задачи N</h2>
			<div className={ styles.leftNavContainer }>
				<Button type='primary'>Создать задачу</Button>
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
	);
};

export default Navigation;