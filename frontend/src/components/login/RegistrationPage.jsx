import React, { useState } from 'react';

import Button from "../navigation/Button";
import useValidation from "../../hooks/useValidation";

import styles from "./RegistrationPage.module.css";

const RegistrationPage = ({ setIsAuthenticated }) => {
    const [ userData, setDataUser ] = useState({
        username: '',
        password: '',
    });
    const { errors, validate } = useValidation();

    const login = () => {
        const isInvalidLogin = validate(userData);
        if (isInvalidLogin) return;
        console.log('sdf');
    };

    const handleChangeInput = e => {
        const { id, value } = e.target;
        setDataUser(prevUser => ({
            ...prevUser,
            [id]: value,
        }));
    };

    return (
        <div className={ styles.registrationWindow }>
            <div className={ styles.containerLogin }>
                <h2 className={ styles.header }>Вход</h2>
                <form
                    className={ styles.loginForm }
                    onKeyUp={ e => e.key === 'Enter' ? login() : '' }
                >
                    <input
                        className={ styles.input }
                        type="text"
                        placeholder="Имя пользователя"
                        id="username"
                        required={ errors.username }
                        value={ userData.username }
                        onChange={ handleChangeInput }
                    />
                    <input
                        className={ styles.input }
                        type="text"
                        placeholder="Пароль"
                        id="password"
                        required={ errors.password }
                        value={ userData.password }
                        onChange={ handleChangeInput }
                    />
                </form>
                <div className={ styles.signInBtnContainer }>
                    <Button type="login" onClick={ login }>Войти</Button>
                </div>
            </div>
        </div>
    );
};

export default RegistrationPage;