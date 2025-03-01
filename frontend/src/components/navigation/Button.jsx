import React from 'react';
import styles from "./Button.module.css";

const Button = ({ type = 'primary', children }) => {
	return (
		<button className={ `${ styles.button } ${ styles[type] }` }>{ children }</button>
	);
};

export default Button;