import React from 'react';
import styles from './Header.module.css';
import { ReactComponent as Logo } from "../../images/logo.svg";

const Header = () => {
	return (
		<header className={ styles.headerContainer }>
			<Logo className={ styles.logo }></Logo>
			<h1 className={ styles.title }>TimeCraft</h1>
		</header>
	);
};

export default Header;