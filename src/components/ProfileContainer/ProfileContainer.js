import { useEffect, useState } from "react";
import useStorage from '../../useStorage';
import fetchData from '../../fetchData';
import './ProfileContainer.css'; // Подключаем внешний CSS файл

function UserContainer() {
    const [token] = useStorage('token', null, 'sessionStorage'); // Получаем токен
    const [error, setError] = useState(null);
    const [profile, setProfile] = useState(null); // Для хранения данных профиля

    useEffect(() => {
        async function fetchToken() {
            if (!token) {
                setError('Токен отсутствует. Пожалуйста, войдите в систему.');
                return;
            }

            try {
                const data = await fetchData('/profile/info', 'GET', null, {
                    Authorization: `${token}`, // Использование токена из sessionStorage
                });
                setProfile(data); // Сохраняем данные профиля
            } catch (err) {
                setError(err.message);
            }
        }

        fetchToken(); // вызов функции
    }, [token]); // зависимость

    if (error) {
        return <p className="errorMessage">{error}</p>;
    }

    return (
        <>
            <h1 className="heading">Добро пожаловать в личный кабинет!</h1>
            {profile && (
                <div className="profile-container">
                    <div className="profileIcon">
                        <div className="avatar">
                            {profile.name[0]}
                        </div>
                    </div>
                    <div className="info">
                        <p><strong>Имя:</strong> {profile.name}</p>
                        <p><strong>Email:</strong> {profile.Email}</p>
                    </div>
                </div>
            )}
        </>
    );
}

export default UserContainer;
