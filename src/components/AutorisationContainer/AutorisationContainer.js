import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import fetchData from '../../fetchData';
import './AutorisationContainer.css';
import useStorage from '../../useStorage';
import ProfileContainer from '../ProfileContainer/ProfileContainer'

function AutorisationContainer() {

    const [sessionStorage, setStorage, removeStorage] = useStorage('Storage', null, 'sessionStorage');
    const [token, setToken, removeToken] = useStorage('token', null, 'sessionStorage');
    const [formAutorisation, setAutorisationData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Правильная инициализация useNavigate

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAutorisationData({ ...formAutorisation, [name]: value });
        setError(''); // Убираем ошибку при изменении полей
    };

    const handleButtonClick = async () => {
        const { email, password } = formAutorisation;
    
        // Проверяем оба поля через switch-case
        let error = '';
        switch (true) {
            case !email.trim() && !password.trim():
                error = 'Заполните форму!';
                break;
    
            case !email.trim():
                error = 'Поле "Логин" не должно быть пустым.';
                break;
    
            case !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email):
                error = 'Введите корректный E-mail.';
                break;
    
            case !password.trim():
                error = 'Поле "Пароль" не должно быть пустым.';
                break;
    
            default:
                error = '';
        }
    
        if (error) {
            setError(error);
            return;
        }
    
        // Отправка данных на сервер после успешной валидации
        const jsonUserRegister = JSON.stringify(formAutorisation);
        console.log(jsonUserRegister);
    
        try {
            const dataUser = await fetchData('/customer/login', 'POST', jsonUserRegister);
            console.log(dataUser);
            setError('');
            setAutorisationData({ email: '', password: '' });
            alert('Вы зашли в аккаунт!');
            setStorage(true);
            setToken(dataUser.token);
            console.log(dataUser.token);
            navigate('/profile');
        } catch (err) {
            const status = err.message.match(/Ошибка: (\d+)/)?.[1];
            console.error('HTTP статус запроса:', status);
            if (status === '500') {
                setError('Неправильный логин или пароль! Попробуйте еще раз!');
            } else {
                setError('Произошла ошибка при регистрации. Попробуйте позже.');
            }
        }
    };
    

    useEffect(() => {
        if (sessionStorage) {
            navigate('/profile');
        }
    }, [sessionStorage, navigate]);

    return (
        <>
            <h1 style={{ textAlign: 'center' }}>Вход в личный кабинет</h1>
            <div className="autorisation-block">
                <form className="autorisation-form">
                    <label htmlFor="email">Логин:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formAutorisation.email}
                        onChange={handleChange}
                        required
                        placeholder="Введите логин"
                    />
                    <label htmlFor="password">Пароль:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formAutorisation.password}
                        onChange={handleChange}
                        required
                        placeholder="Введите пароль"
                    />
                    <br />
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <button type="button" onClick={handleButtonClick}>Войти</button>
                    <p>
                        Нет личного кабинета?{' '}
                        <a href="" onClick={(e) => { e.preventDefault(); navigate('/registration'); }}>
                            Зарегистрироваться!
                        </a>
                    </p>
                </form>
            </div>
        </>
    );

}

export default AutorisationContainer;
