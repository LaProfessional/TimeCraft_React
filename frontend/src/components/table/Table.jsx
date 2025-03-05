import React, { useContext, useEffect, useState } from 'react';
import { TaskContext } from "./TaskProvider";

import styles from './Table.module.css';

const Table = () => {
	const { tasks, setTasks } = useContext(TaskContext);

	useEffect(() => {
		fetch('http://localhost:5000/tasks', {
			method: 'GET',
			headers: {
				'Content-type': 'application/json',
			},
		}).then(response => {
			return response.json();
		}).then(tasks => setTasks(tasks));
	}, []);

	return (
		<div className={ styles.tableContainer }>
			<div className={ styles.table }>
				<div className={ styles.tableHeaderRow }>
					<div className={ styles.tableHeaderCell }>
						<input className={ styles.headerCheckbox } type="checkbox"/>
					</div>
					<div className={ styles.tableHeaderCell }>Название</div>
					<div className={ styles.tableHeaderCell }>Описание</div>
					<div className={ styles.tableHeaderCell }>Дата начала</div>
					<div className={ styles.tableHeaderCell }>Дата окончания</div>
				</div>

				{ tasks.map(task =>
					<div className={ styles.tableBody } key={ task.id }>
						<div className={ styles.tableRow }>
							<div className={ styles.tableCell }>
								<input className={ styles.checkbox } type='checkbox'/>
							</div>
							<div className={ styles.tableCell }>{ task.title }</div>
							<div className={ styles.tableCell }>{ task.description }</div>
							<div className={ styles.tableCell }>{ task.startDatetime }</div>
							<div className={ styles.tableCell }>{ task.endDatetime }</div>
						</div>
					</div>
				) }
			</div>
		</div>
	);
};

export default Table;