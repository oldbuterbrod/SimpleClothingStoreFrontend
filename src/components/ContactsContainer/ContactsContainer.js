import './ContactsContainer.css'
import { useState } from 'react';
import useStorage from '../../useStorage'; // Хук из вашего примера

function ContactsContainer() {
    // Убедитесь, что начальные значения не undefined, а пустые строки
    const [name, setName, removeName] = useStorage('name', '');
    const [email, setEmail, removeEmail] = useStorage('email', '');
    const [theme, setTheme, removeTheme] = useStorage('theme', '');
    const [message, setMessage, removeMessage] = useStorage('message', '');

    // Очистка формы и данных в хранилище
    const clearForm = () => {
        setName('');        // Сбрасываем локальное состояние
        setEmail('');       // Сбрасываем локальное состояние
        setTheme('');       // Сбрасываем локальное состояние
        setMessage('');     // Сбрасываем локальное состояние

        removeName();       // Удаляем данные из хранилища
        removeEmail();      // Удаляем данные из хранилища
        removeTheme();      // Удаляем данные из хранилища
        removeMessage();    // Удаляем данные из хранилища
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Логика обработки формы, например, отправка данных на сервер
        alert('Ваша форма отправлена!')

        // Очистить форму и хранилище
        clearForm();
    };

    return (
        <>
            <div className='contacts-text'>
                <p>
                    Если у вас есть вопросы или предложения,
                    мы всегда рады помочь!
                    <br />
                    Свяжитесь с нами удобным для вас способом
                </p>
            </div>
            <h1>Основная контактная информация</h1>
            <div className='contacts-block'>
                <ul>
                    <li>Горячая линия: + 7 495 900 73 33(c 9:00 до 23:00)</li>
                    <li>Для общих вопросов: info@bebezians.ru.</li>
                    <li>Для партнерств: partners@bebezians.ru.</li>
                    <li>Telegram-канал: @bebeziansstore.</li>
                </ul>
            </div>

            <h1>Форма обратной связи</h1>
            <div className='form-block'>
                <p>
                    Если у вас остались вопросы, заполните форму.
                    Мы ответим вам в течении 24 часов!
                </p>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Имя:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        required
                        placeholder="Введите имя"
                        value={name || ''} // Обеспечиваем, что значение всегда строка
                        onChange={(e) => setName(e.target.value)}
                    />

                    <label htmlFor="email">E-Mail:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        placeholder="Введите E-Mail"
                        value={email || ''} // Обеспечиваем, что значение всегда строка
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label htmlFor="theme">Тема:</label>
                    <input
                        type="text"
                        id="theme"
                        name="theme"
                        required
                        placeholder="Введите тему сообщения"
                        value={theme || ''} // Обеспечиваем, что значение всегда строка
                        onChange={(e) => setTheme(e.target.value)}
                    />

                    <label htmlFor="message">Сообщение:</label>
                    <textarea
                        id="message"
                        name="message"
                        rows="5"
                        cols="30"
                        placeholder="Введите текст сообщения"
                        value={message || ''} // Обеспечиваем, что значение всегда строка
                        onChange={(e) => setMessage(e.target.value)}
                    ></textarea>

                    <button type="submit">Отправить</button>
                </form>
            </div>
        </>
    );
}

export default ContactsContainer;
