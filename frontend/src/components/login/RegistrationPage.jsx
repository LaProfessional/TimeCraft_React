import React, { useContext, useEffect, useState } from 'react';

import Button from "../navigation/Button";
import Overlay from "../modalWindow/Overlay";
import useValidation from "../../hooks/useValidation";

import { ModalModeContext } from "../providers/ModalModeProvider";
import { url } from "../../constants";

import styles from "./RegistrationPage.module.css";

const RegistrationPage = ({ setIsAuthenticated }) => {
    const [ userData, setDataUser ] = useState({
        username: '',
        password: '',
    });
    const [ loginError, setLoginError ] = useState({
        errorLogin: '',
        errorPassword: '',
    });

    const { errors, setErrors, validate } = useValidation();
    const { isModalOpen, setIsModalOpen, modalMode, setModalMode } = useContext(ModalModeContext);
    const { title, buttonText, type } = modalMode;

    const login = () => {
        const isInvalidLogin = validate(userData);
        if (isInvalidLogin) return;

        fetch(`${ url }/auth/${ type }`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ userData }),

        }).then((response) => {
            switch (type) {
                case "registration":
                    setIsAuthenticated(true);
                    setIsModalOpen(false);
                    break;
                case "login":
                    return response.json();
                default:
            }
        }).then(login => {
            if (login.errorLogin || login.errorPassword) {
                setLoginError(() => ({
                    ...login
                }));
            } else {
                setIsAuthenticated(true);
                setIsModalOpen(false);
            }
        });
    };

    const resetForm = () => {
        setDataUser({
            username: '',
            password: '',
        });
        setLoginError({
            errorLogin: '',
            errorPassword: '',
        });
    };

    useEffect(() => {
        if (isModalOpen) resetForm();
    }, [ isModalOpen ]);

    const closeModalWindow = e => {
        if (e.target === e.currentTarget) {
            setErrors({});
            setIsModalOpen(false);
        }
    };

    const handleChangeInput = e => {
        const { id, value } = e.target;
        setDataUser(prevUser => ({
            ...prevUser,
            [id]: value,
        }));
    };

    return (
        <>
            <div className={ styles.containerBtnLogin }>
                <Button onClick={ () => {
                    setIsModalOpen(true);
                    setModalMode("login");
                } }>Войти</Button>

                <Button onClick={ () => {
                    setIsModalOpen(true);
                    setModalMode("registration")
                } }>Зарегистрироваться</Button>
            </div>

            <Overlay onMouseDown={ closeModalWindow } isModalOpen={ isModalOpen }>
                <div className={ styles.containerLogin }>
                    <h2 className={ styles.title }>{ title }</h2>
                    <form
                        className={ styles.loginForm }
                        onKeyUp={ e => e.key === 'Enter' ? login() : '' }
                    >
                        <div className={ styles.inputContainer }>
                            <input
                                className={ styles.input }
                                type="text"
                                placeholder="Имя пользователя"
                                id="username"
                                required={ errors.username }
                                value={ userData.username }
                                onChange={ handleChangeInput }
                            />
                            <p className={ `${ styles.errorLogin } ${ loginError.errorLogin ? '' : styles.hidden }` }>Имя
                                пользователя не существует</p>
                        </div>

                        <div className={ styles.inputContainer }>
                            <input
                                className={ styles.input }
                                type="text"
                                placeholder="Пароль"
                                id="password"
                                required={ errors.password }
                                value={ userData.password }
                                onChange={ handleChangeInput }
                            />
                            <p className={ `${ styles.errorPassword } ${ loginError.errorPassword ? '' : styles.hidden }` }>Неверный
                                пароль</p>
                        </div>
                    </form>
                    <div className={ styles.signInBtnContainer }>
                        <Button type="login" onClick={ login }>{ buttonText }</Button>
                    </div>
                </div>
            </Overlay>
            <p className={ styles.content }>Типа контента много здесь</p>
        </>
    );
};

export default RegistrationPage;