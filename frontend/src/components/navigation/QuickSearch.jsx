import React from 'react';
import styles from "./QuickSearch.module.css";

const QuickSearch = ({ type = 'text', placeholder = 'Поиск...' }) => {
	return (
		<input className={ styles.quickSearch } placeholder={ placeholder } type={ type }/>
	);
};

export default QuickSearch;