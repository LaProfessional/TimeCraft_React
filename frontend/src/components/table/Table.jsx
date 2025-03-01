import React from 'react';
import styles from './Table.module.css';

const Table = () => {
	return (
		<div className={ styles.tableContainer }>
			<div className={ styles.table }>
				<div className={ styles.tableHeaderRow }>
					<div className={ styles.tableHeaderCell }>
						<input className={ styles.headerCheckbox } type="checkbox"/>
					</div>
					<div className={ styles.tableHeaderCell }>Название</div>
					<div className={ styles.tableHeaderCell }>Описание</div>
					<div className={ styles.tableHeaderCell }>Дата начала</div>
					<div className={ styles.tableHeaderCell }>Дата окончания</div>
				</div>

				<div className={ styles.tableBody }>
					<div className={ styles.tableRow }>
						<div className={ styles.tableCell }>
							<input className={ styles.checkbox } type='checkbox'/>
						</div>
						<div className={ styles.tableCell }>Any text</div>
						<div className={ styles.tableCell }>Any text</div>
						<div className={ styles.tableCell }>Any text</div>
						<div className={ styles.tableCell }>Any text</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Table;