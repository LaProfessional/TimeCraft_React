import React from 'react';
import ModalContent from "./ModalContent";

import styles from './Modal.module.css';

const Modal = ({ isOpen, setIsOpen }) => {

	const closeModalWindow = e => {
		if (e.target === e.currentTarget) setIsOpen(false);
	}

	return (
		<div className={ `${ styles.overlay } ${ isOpen ? styles.active : '' }` }
			 onClick={ e => closeModalWindow(e) }
		>
			<div className={ `${ styles.container } ${ isOpen ? styles.slidingModalWindow : '' }` }>
				<div className={ styles.headerContainer }>
					<h2 className={ styles.title }>Новая задача</h2>

					<button className={ styles.btnClose }
						onClick={ e => {
							e.stopPropagation();
							closeModalWindow(e)
						} }
					>
					</button>
				</div>

				<ModalContent/>

				<footer className={ styles.footer }>
					<button className={ `${ styles.btn } ${ styles.btnSave }` }>Сохранить</button>

					<button className={ `${ styles.btn } ${ styles.btnCancel }` }
						onClick={ e => {
							e.stopPropagation();
							closeModalWindow(e)
						} }
					>
					Отмена</button>
				</footer>
			</div>
		</div>
	);
};

export default Modal;