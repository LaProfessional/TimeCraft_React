import React, { createContext, useEffect, useState } from 'react';

export const ModalModeContext = createContext();

const ModalModeProvider = ({ children }) => {
    const [ modalMode, setModalMode ] = useState({
        title: "",
        buttonText: "",
        type: "",
    });

    const [ isModalOpen, setIsModalOpen ] = useState(false);

    useEffect(() => {
        switch (modalMode) {
            case "create":
                setModalMode({
                    title: "Новая задача",
                    buttonText: "Создать задачу",
                    type: "create",
                });
                break;
            case "edit":
                setModalMode({
                    title: "Редактирование задачи",
                    buttonText: "Редактировать",
                    type: "edit"
                });
                break;
            case "view":
                setModalMode({
                    title: "Просмотр задачи",
                    buttonText: "Редактировать",
                    type: "view",
                });
                break;
            case "registration":
                setModalMode({
                    title: "Регистрация",
                    buttonText: "Зарегистрироваться",
                    type: "registration",
                });
                break;
            case "login":
                setModalMode({
                    title: "Вход",
                    buttonText: "Войти",
                    type: "login",
                });
                break;
            default:
        }
    }, [ modalMode ]);

    return (
        <ModalModeContext.Provider value={ { modalMode, setModalMode, isModalOpen, setIsModalOpen } }>
            { children }
        </ModalModeContext.Provider>
    );
};

export default ModalModeProvider;