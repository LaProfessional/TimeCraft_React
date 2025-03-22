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
    const [ authError, setAuthError ] = useState({
        errorLogin: '',
        errorPassword: '',
    });
    const [ isLoading, setIsLoading ] = useState(true);

    const { errors, setErrors, validate } = useValidation();

    const { isModalOpen, setIsModalOpen, modalMode, setModalMode } = useContext(ModalModeContext);
    const { title, buttonText, errorMessageUser, type } = modalMode;

    const authenticateUser = () => {
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

        }).then(authResponse => {
            if (authResponse.errorLogin || authResponse.errorPassword) {
                setAuthError(() => ({ ...authResponse }));
            } else {
                localStorage.setItem("userToken", authResponse);
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
        setAuthError({
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
        setIsLoading(false);
    }, []);

    return (
        <>
            { !isLoading && (
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
                                onKeyUp={ e => e.key === 'Enter' ? authenticateUser() : '' }
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
                                    <p className={ `${ styles.errorLogin } ${ authError.errorLogin ? '' : styles.hidden }` }>{ errorMessageUser }</p>
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
                                    <p className={ `${ styles.errorPassword } ${ authError.errorPassword ? '' : styles.hidden }` }>Неверный
                                        пароль</p>
                                </div>
                            </form>
                            <div className={ styles.signInBtnContainer }>
                                <Button type="login" onClick={ authenticateUser }>{ buttonText }</Button>
                            </div>
                        </div>
                    </Overlay>
                    <p className={ styles.content }>Типа контента много здесь</p>
                </>
            ) }
        </>
    );
};

export default RegistrationPage;