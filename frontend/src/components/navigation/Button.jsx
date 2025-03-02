import React from 'react';
import styles from "./Button.module.css";

const Button = ({ type = 'primary', children, onClick }) => {
	return (
		<button className={ `${ styles.button } ${ styles[type] }` } onClick={onClick}>{ children }</button>
	);
};

export default Button;