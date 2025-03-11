import React, { useContext } from 'react';

import styles from "./Table.module.css";

import { SelectedTaskIdsContext } from "../providers/SelectedTaskIdsProvider";
import { ModalModeContext } from "../providers/ModalModeProvider";

const TaskTableCell = ({ children, id }) => {

    const { setModalMode, setIsModalOpen } = useContext(ModalModeContext);
    const { setSelectedTaskIds } = useContext(SelectedTaskIdsContext);

    const openTaskDetails = taskId => {
        setModalMode("view");
        setIsModalOpen(true);
        setSelectedTaskIds([ taskId ]);
    };

    return (
        <div className={ styles.tableCell } onClick={ () => openTaskDetails(id) }>{ children }</div>
    );
};

export default TaskTableCell;