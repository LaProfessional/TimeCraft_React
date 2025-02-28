import React from 'react';
import Button from "./Button";

import styles from './Navigation.module.css';

const Navigation = () => {
	return (
		<nav className={ styles.navContainer }>
			<h2 className={ styles.title }>Задачи N</h2>
			<div className={ styles.leftNavContainer }>
				<Button>Создать задачу</Button>
				<Button>Редактировать</Button>
				<Button className={ styles.btnDelete }>Удалить</Button>
				<div className={ styles.quickSearchContainer }>
					<input className={ styles.quickSearch } type="text" placeholder='Поиск...'/>
				</div>
				<div className={ styles.sortingContainer }>
					<label htmlFor="sortOptions">Сортировать по:</label>
					<select className={ styles.sortOptions } id="sortOptions">
						<option value="startDatetime|asc">Дате создания (по возрастанию)</option>
						<option value="startDatetime|desc">Дате создания (по убыванию)</option>
						<option value="title|asc">Названию (по возрастанию)</option>
						<option value="title|desc">Названию (по убыванию)</option>
						<option value="startDatetime|asc">Дате начала (по возрастанию)</option>
						<option value="startDatetime|desc">Дате начала (по убыванию)</option>
						<option value="endDatetime|asc">Дате окончания (по возрастанию)</option>
						<option value="endDatetime|desc">Дате окончания (по убыванию)</option>
					</select>
				</div>
			</div>
			<div className={ styles.rightNavContainer }>
				<Button className={ styles.btnExit }>Выйти</Button>
			</div>
		</nav>
	);
};

export default Navigation;