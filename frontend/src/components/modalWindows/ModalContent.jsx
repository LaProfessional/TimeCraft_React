import React, { useState, useEffect } from 'react';
import styles from "./ModalContent.module.css";

const ModalContent = ({ isClickBtnSave, setIsClickBtnSave }) => {
	const [ startDate, setStartDate ] = useState('');
	const [ startTime, setStartTime ] = useState('');
	const [ endDate, setEndDate ] = useState('');
	const [ endTime, setEndTime ] = useState('');
	const [ title, setTitle ] = useState('');
	const [ description, setDescription ] = useState('');

	// const [task, setTask] = useState({
	//
	// });
	const [ task, setTask ] = useState(null);

	useEffect(() => {
		if (!task) return;
		console.log(task);
	}, [ task ]);

	useEffect(() => {
		const currentDate = new Date();
		setStartDate(currentDate.toISOString().slice(0, 10));

		const now = new Date();
		const hours = now.getHours().toString().padStart(2, '0');
		const minutes = now.getMinutes().toString().padStart(2, '0');
		const time = `${ hours }:${ minutes }`;
		setStartTime(time);
	}, []);

	useEffect(() => {
		if (!isClickBtnSave) return;

		const startDatetime = new Date(`${ startDate } ${ startTime }`).toISOString();
		const endDatetime = endDate && endTime ? new Date(`${ endDate } ${ endTime }`).toISOString() : null;

		setTask(prev => ({
			...prev,
			title,
			description,
			startDatetime,
			endDatetime,
		}));

		setIsClickBtnSave(false);
	}, [ isClickBtnSave ]);

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
				<label className={ styles.blockTitle } htmlFor="title">Название задачи:</label>
				<input
					className={ styles.input }
					type="text" placeholder="Задача"
					id="title"
					value={ title }
					onChange={ e => setTitle(e.target.value) }
				/>
			</div>

			<div className={ styles.inputGroup }>
				<label className={ styles.blockTitle } htmlFor="description">Описание:</label>
				<textarea
					className={ styles.description }
					placeholder="Описание"
					id="description"
					value={ description }
					onChange={ e => setDescription(e.target.value) }
				/>
			</div>

			<div className={ styles.inputGroup }>
				<label className={ styles.blockTitle } htmlFor="startDate">Дата начала:</label>
				<div className={ styles.dateGroup }>
					<input
						className={ styles.inputDatetime }
						type="date"
						min="2000-01-01"
						max="2100-01-01"
						id="startDate"
						value={ startDate }
						onChange={ e => setStartDate(e.target.value) }
						onBlur={ e => handleChangeDate('startDate', e) }
					/>
					<input
						className={ styles.inputDatetime }
						type="time"
						id="startTime"
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
						value={ endTime }
						onChange={ e => setEndTime(e.target.value) }
					/>
				</div>
			</div>
		</section>
	);
};

export default ModalContent;