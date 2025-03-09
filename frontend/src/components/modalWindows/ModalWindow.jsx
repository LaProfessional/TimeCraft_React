import React from 'react';

import styles from './ModalWindow.module.css';

const ModalWindow = React.memo(({ isModalOpen, setIsModalOpen, modalTitle, buttonText, children, setIsClickBtnSave }) => {

	const closeModalWindow = e => {
		if (e.target === e.currentTarget) setIsModalOpen(false);
	}

	return (
		<div
			className={ `${ styles.overlay } ${ isModalOpen ? styles.active : '' }` }
			onClick={ e => closeModalWindow(e) }
		>
			<div className={ `${ styles.container } ${ isModalOpen ? styles.slidingModalWindow : '' }` }>
				<div className={ styles.headerContainer }>
					<h2 className={ styles.title }>{ modalTitle }</h2>

					<button
						className={ styles.btnClose }
						onClick={ e => {
							e.stopPropagation();
							closeModalWindow(e);
						} }
					></button>
				</div>
				{ children }
				<footer className={ styles.footer }>
					<button
						className={ `${ styles.btn } ${ styles.btnSave }` }
						onClick={ e => {
							setIsClickBtnSave(true)
							e.stopPropagation();
							closeModalWindow(e);
						} }
					>{ buttonText }</button>

					<button
						className={ `${ styles.btn } ${ styles.btnCancel }` }
						onClick={ e => {
							e.stopPropagation();
							closeModalWindow(e);
						} }
					>Отмена</button>
				</footer>
			</div>
		</div>
	);
});

export default ModalWindow;