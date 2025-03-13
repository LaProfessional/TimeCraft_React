import React, { useContext } from 'react';

import { ModalModeContext } from "../providers/ModalModeProvider";

import styles from './ModalWindow.module.css';

const ModalWindow = React.memo(({ children, setIsClickBtnSave }) => {
	const { modalMode, setModalMode, isModalOpen, setIsModalOpen } = useContext(ModalModeContext);

	const {
		title,
		buttonText,
		type,
	} = modalMode;

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
					<h2 className={ styles.title }>{ title }</h2>

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
							if (type === "view") {
								setModalMode("edit");
							} else {
								setIsClickBtnSave(true)
								e.stopPropagation();
								closeModalWindow(e);
							}
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