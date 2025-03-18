import React, { useContext, useEffect, useState } from 'react';

import Button from "../navigation/Button";
import Overlay from "../modalWindow/Overlay";
import useValidation from "../../hooks/useValidation";

import { ModalModeContext } from "../providers/ModalModeProvider";
import { LoadingStatusContext } from "../providers/LoadingStatusProvider";
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

    const { isMounted, setIsMounted } = useContext(LoadingStatusContext);
    const { isModalOpen, setIsModalOpen, modalMode, setModalMode } = useContext(ModalModeContext);
    const { title, buttonText, errorMessageUser, type } = modalMode;

    const login = () => {
        const isInvalidLogin = validate(userData);
        if (isInvalidLogin) return;

        fetch(`${ url }/auth/${ type }`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ userData }),

        }).then(response => {
            return response.json();

        }).then(login => {
            if (login.errorLogin || login.errorPassword) {
                setLoginError(() => ({ ...login }));
            } else {
                localStorage.setItem("userToken", login);
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

    useEffect(() => {
        if (localStorage.getItem("userToken")) setIsAuthenticated(true);
    }, []);

    useEffect(() => setIsMounted(true), []);
    if (!isMounted) return;

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
                            <p className={ `${ styles.errorLogin } ${ loginError.errorLogin ? '' : styles.hidden }` }>{ errorMessageUser }</p>
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