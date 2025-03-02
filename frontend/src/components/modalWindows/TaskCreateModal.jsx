import React from 'react';
import styles from './TaskCreateModal.module.css';
import '../../styles/main.css';

const TaskCreateModal = ({ isOpen, setIsOpen }) => {

	const closeTaskCreateModal = () => setIsOpen(false);

	return (
		<div className={ `${ styles.overlay }` }>
			<div className={ styles.container }>
				<div className={ styles.headerContainer }>
					<h2 className={ styles.title }>Новая задача</h2>
					<button className={ styles.btnClose } onClick={closeTaskCreateModal}></button>
				</div>
				<section className={ styles.details }>
					<div className={ styles.inputGroup }>
						<label className={ styles.blockTitle } htmlFor="taskName">Название задачи:</label>
						<input className={ styles.input } type="text" placeholder="Задача" name="taskName"/>
					</div>

					<div className={ styles.inputGroup }>
						<label className={ styles.blockTitle } htmlFor="description">Описание:</label>
						<textarea className={ styles.description } placeholder="Описание" name="description"/>
					</div>

					<div className={ styles.inputGroup }>
						<label className={ styles.blockTitle } htmlFor="inputDate">Дата начала:</label>
						<div className={ styles.dateGroup }>
							<input className={ styles.inputDatetime } type="date" min="2000-01-01" max="2100-01-01"
								   name="inputDate"/>
							<input className={ styles.inputDatetime } type="time"/>
						</div>
					</div>

					<div className={ styles.inputGroup }>
						<label className={ styles.blockTitle } htmlFor="inputDate">Дата окончания:</label>
						<div className={ styles.dateGroup }>
							<input className={ styles.inputDatetime } type="date" max="2100-01-01"
								   name="inputDate"/>
							<input className={ styles.inputDatetime } type="time"/>
						</div>
					</div>
				</section>
				<footer className={ styles.footer }>
					<button className={ `${ styles.btn } ${ styles.btnSave }` }>Сохранить</button>
					<button className={ `${ styles.btn } ${ styles.btnCancel }` } onClick={closeTaskCreateModal}>Отмена</button>
				</footer>
			</div>
		</div>
	);
};

export default TaskCreateModal;