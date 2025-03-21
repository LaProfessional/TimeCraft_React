import React from 'react';

import styles from "./AuthorLink.module.css";

const AuthorLink = React.memo(({ children }) => {
    return (
        <div className={ styles.authorWrapper }>
            <a
                className={ styles.authorLink }
                href="https://github.com/LaProfessional/TimeCraft_React"
                target={ "_blank" }
            >{ children }
            </a>
        </div>
    );
});

export default AuthorLink;