import React from 'react';

import styles from "./AuthorLink.module.css";

const AuthorLink = React.memo(({ children }) => {
    return (
        <div className={ styles.authorWrapper }>
            <a
                className={ styles.authorLink }
                href="https://github.com/TopTTeDHbIu-DeJLbFuH4uk/TimeCraft_React"
                target={ "_blank" }
            >{ children }
            </a>
        </div>
    );
});

export default AuthorLink;