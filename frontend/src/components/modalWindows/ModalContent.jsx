import React, { useState, useEffect } from 'react';
import styles from "./ModalContent.module.css";
import { logDOM } from "@testing-library/dom";

const ModalContent = () => {
	const [ startDate, setStartDate ] = useState('');
	const [ startTime, setStartTime ] = useState('');
	const [ endDate, setEndDate ] = useState('');

	useEffect(() => {
		const currentDate = new Date();
		setStartDate(currentDate.toISOString().slice(0, 10));

		const now = new Date();
		const hours = now.getHours().toString().padStart(2, '0');
		const minutes = now.getMinutes().toString().padStart(2, '0');
		const time = `${ hours }:${ minutes }`;
		setStartTime(time);
	}, []);

	const handleChangeDate = (inputId, e) => {
		const currentYear = parseInt(e.target.value.slice(0, 4));

		switch (inputId) {
			case 'startDate':
				if (2100 < currentYear || 2000 > currentYear || !e.target.value) {
					const defaultDate = new Date();
					setStartDate(defaultDate.toISOString().slice(0, 10));
				}
				break;
			case 'endDate':
				const minYear = parseInt(startDate.slice(0, 4));

				if (2100 < currentYear || minYear > currentYear) {
					setEndDate(startDate);
				}
				break;
			default:
		}
	};

	return (
		<section className={ styles.details }>
			<div className={ styles.inputGroup }>
				<label className={ styles.blockTitle } htmlFor="taskName">Название задачи:</label>
				<input className={ styles.input } type="text" placeholder="Задача" id="taskName"/>
			</div>

			<div className={ styles.inputGroup }>
				<label className={ styles.blockTitle } htmlFor="description">Описание:</label>
				<textarea className={ styles.description } placeholder="Описание" id="description"/>
			</div>

			<div className={ styles.inputGroup }>
				<label className={ styles.blockTitle } htmlFor="startDatetime">Дата начала:</label>
				<div className={ styles.dateGroup }>
					<input
						className={ styles.inputDatetime }
						type="date"
						min="2000-01-01"
						max="2100-01-01"
						id="startDatetime"
						value={ startDate }
						onChange={ e => setStartDate(e.target.value) }
						onBlur={ e => handleChangeDate('startDate', e) }
					/>
					<input
						className={ styles.inputDatetime }
						type="time"
						value={ startTime }
						onChange={ e => setStartDate(e.target.value) }
					/>
				</div>
			</div>

			<div className={ styles.inputGroup }>
				<label className={ styles.blockTitle } htmlFor="endDatetime">Дата окончания:</label>
				<div className={ styles.dateGroup }>
					<input
						className={ styles.inputDatetime }
						type="date"
						max="2100-01-01"
						id="endDatetime"
						value={ endDate }
						onChange={ e => setEndDate(e.target.value) }
						onBlur={ e => handleChangeDate('endDate', e) }
					/>
					<input
						className={ styles.inputDatetime }
						type="time"
					/>
				</div>
			</div>
		</section>
	);
};

export default ModalContent;