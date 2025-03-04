import React, { useEffect, useState } from 'react';

import styles from './ModalWindow.module.css';

const ModalWindow = ({ isOpen, setIsOpen, title, children, setIsClickBtnSave }) => {

	const closeModalWindow = e => {
		if (e.target === e.currentTarget) setIsOpen(false);
	}

	return (
		<div
			className={ `${ styles.overlay } ${ isOpen ? styles.active : '' }` }
			onClick={ e => closeModalWindow(e) }
		>
			<div className={ `${ styles.container } ${ isOpen ? styles.slidingModalWindow : '' }` }>
				<div className={ styles.headerContainer }>
					<h2 className={ styles.title }>{ title }</h2>

					<button
						className={ styles.btnClose }
						onClick={ e => {
							e.stopPropagation();
							closeModalWindow(e);
						} }
					>
					</button>
				</div>
				{ children }
				<footer className={ styles.footer }>
					<button
						className={ `${ styles.btn } ${ styles.btnSave }` }
						onClick={ () => setIsClickBtnSave(true) }

					>Сохранить
					</button>

					<button
						className={ `${ styles.btn } ${ styles.btnCancel }` }
						onClick={ e => {
							e.stopPropagation();
							closeModalWindow(e);
						} }
					>Отмена
					</button>
				</footer>
			</div>
		</div>
	);
};

export default ModalWindow;