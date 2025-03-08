import React from 'react';
import styles from "./Button.module.css";

const Button = React.memo(({ type = 'primary', disabled, children, onClick }) => {
	return (
		<button
			className={ `${ styles.button } ${ styles[type] }` }
			onClick={ onClick }
			disabled={ disabled }
		>
			{ children }
		</button>
	);
});

export default Button;