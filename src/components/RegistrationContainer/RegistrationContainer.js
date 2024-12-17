import './RegistrationContainer.css';
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useStorage from '../../useStorage';
import fetchData from '../../fetchData';

function RegistrationContainer() {

    const [sessionStorage, setStorage, removeStorage] = useStorage('Storage', null, 'sessionStorage');

    const navigate = useNavigate();

    const [formRegistration, setRegistrationData] = useState({
        email: '',
        password: '',
        username: '',
    });
    const [error, setError] = useState('');
    const repeatPasswordRef = useRef();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegistrationData({ ...formRegistration, [name]: value });
        
        setError(''); // Убираем ошибку при изменении полей
    };

    const handleButtonClick = async () => {
        const { email, password, username } = formRegistration;
        const repeatPassword = repeatPasswordRef.current.value;
    
        let error = '';
    
        // Проверка полей с использованием switch-case
        switch (true) {
            case !username.trim() && !email.trim() && !password.trim() && !repeatPassword.trim():
                error = 'Заполните все поля формы!';
                break;
    
            case !username.trim():
                error = 'Поле "Имя" не должно быть пустым.';
                break;
    
            case !email.trim():
                error = 'Поле "Почта" не должно быть пустым.';
                break;
    
            case !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email):
                error = 'Введите корректный E-mail.';
                break;
    
            case !password.trim():
                error = 'Поле "Пароль" не должно быть пустым.';
                break;
    
            //case password.length < 6:
            //    error = 'Пароль должен содержать не менее 6 символов.';
            //    break;
    //
            case password !== repeatPassword:
                error = 'Пароли не совпадают!';
                break;
    
            default:
                error = '';
        }
    
        if (error) {
            setError(error);
            return;
        }
    
        // Преобразуем данные формы в JSON
        const jsonUserRegister = JSON.stringify(formRegistration);
        console.log(jsonUserRegister);
    
        try {
            // Отправляем данные на сервер
            const dataUser = await fetchData('/customer/register', 'POST', jsonUserRegister);
            console.log(dataUser);
            setError('');
            setRegistrationData({ email: '', password: '', username: '' });
            repeatPasswordRef.current.value = '';
            alert('Вы успешно зарегистрировались!');
            navigate('/autorisation');
        } catch (err) {
            const status = err.message.match(/Ошибка: (\d+)/)?.[1]; // Извлечение статуса из сообщения об ошибке
            console.error('HTTP статус запроса:', status);
    
            // Уведомление пользователя в зависимости от статуса
            if (status === '404') {
                setError('Такой пользователь уже существует!');
            } else if (status === '500') {
                setError('Сервер временно недоступен. Попробуйте позже.');
            } else {
                setError('Произошла ошибка при регистрации. Попробуйте позже.');
            }
        }
    };
    

    return (
        <>
            <h1 style={{ textAlign: 'center' }}>Регистрация</h1>
            <div className="registration-block">
                <form className="registration-form">
                    <label htmlFor="username">Имя:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formRegistration.username}
                        onChange={handleChange}
                        required
                        placeholder="Введите имя"
                    />
                    <label htmlFor="email">Почта:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formRegistration.email}
                        onChange={handleChange}
                        required
                        placeholder="Введите почту"
                    />
                    <label htmlFor="password">Пароль:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formRegistration.password}
                        onChange={handleChange}
                        required
                        placeholder="Введите пароль"
                    />
                    <label htmlFor="repeatpassword">Повторите пароль:</label>
                    <input
                        type="password"
                        id="repeatpassword"
                        name="repeatpassword"
                        ref={repeatPasswordRef}
                        required
                        placeholder="Введите пароль еще раз"
                    />
                    <br />
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <button type="button" onClick={handleButtonClick}>
                        Зарегистрироваться
                    </button>
                </form>
            </div>
        </>
    );
}

export default RegistrationContainer;
