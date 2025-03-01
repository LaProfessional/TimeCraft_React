import React from 'react';
import styles from "./TasksSortOptions.module.css";

const TasksSortOptions = () => {
	return (
		<>
			<label htmlFor="sortOptions" className={ styles.sortLabel }>Сортировать по:</label>
			<select className={ styles.sortOptions } id='sortOptions'>
				<option value='startDatetime|asc'>Дате создания (по возрастанию)</option>
				<option value='startDatetime|desc'>Дате создания (по убыванию)</option>
				<option value='title|asc'>Названию (по возрастанию)</option>
				<option value='title|desc'>Названию (по убыванию)</option>
				<option value='startDatetime|asc'>Дате начала (по возрастанию)</option>
				<option value='startDatetime|desc'>Дате начала (по убыванию)</option>
				<option value='endDatetime|asc'>Дате окончания (по возрастанию)</option>
				<option value='endDatetime|desc'>Дате окончания (по убыванию)</option>
			</select>
		</>
	);
};

export default TasksSortOptions;