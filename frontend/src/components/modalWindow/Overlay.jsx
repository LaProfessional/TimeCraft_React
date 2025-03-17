import React from 'react';

import styles from './Overlay.module.css';

const Overlay = ({ children, isModalOpen, onMouseDown }) => {
    return (
        <div
            className={ `${ styles.overlay } ${ isModalOpen ? styles.active : '' }` }
            onMouseDown={ onMouseDown }
        >{ children }</div>
    );
};

export default Overlay;