import { useEffect } from "react";
import useStorage from '../../useStorage';

function UserContainer(){

    const [token] = useStorage('token', null, 'sessionStorage'); // Получаем токен

    useEffect(() => {
        if (token) {
            console.log('Токен из сессионного хранилища:', token);
            // Выполните действия, если токен существует, например, загрузка профиля

        } else {
            console.log('Токен отсутствует, редирект на авторизацию');
        }
    }, [token]);
    

    return(
        <>
            <h1 style={{textAlign:'center'}}>Добро пожаловать в личный кабинет</h1>
        </>
    )
}
export default UserContainer