import React, { useEffect, useState } from 'react';
import fetchData from '../../fetchData'; // Импорт функции для запросов
import useStorage from '../../useStorage'; // Импорт пользовательского хука
import './CartContainer.css'; // Подключение CSS

function CartContainer() {
  const [cart, setCart] = useState(null);
  const [error, setError] = useState(null);
  const [token] = useStorage('token', null, 'sessionStorage'); // Получение токена из sessionStorage

  useEffect(() => {
    async function fetchCart() {
      if (!token) {
        setError('Токен отсутствует. Пожалуйста, войдите в систему.');
        return;
      }

      try {
        const data = await fetchData('/cart/getCart', 'GET', null, {
          Authorization: `${token}`, // Использование токена из sessionStorage
        });
        setCart(data);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchCart();
  }, [token]); // Зависимость от токена

  if (error && token) { 
    return (
        <div style={{ height: "120px"}}>
            <h1 style={{}}>Корзина пуста</h1>
        </div>
    );
}

 else if (error && !token) { 
    return (
        <div style={{ height: "120px"}}>
            <h1 style={{}}>Вы не авторизированы! Войдите в систему!</h1>
        </div>
    );
    }



  if (!cart) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="cart-container">
      {cart.cart_product.map((item) => (
        <div className="cart-item" key={item.cartItemId}>
          <img src={item.image_url} alt={item.name} />
          <div className="cart-item-details">
            <h3>{item.name}</h3>
            <p>Размер: {item.size}</p>
            <p>Количество: {item.quantity}</p>
            <p>Цена(1.шт): {item.price} руб.</p>
            <p className="item-total-price">Итого: {item.sum_price} руб.</p>
          </div>
        </div>
      ))}
      <div className="cart-total">
        <h3>Итоговая цена: {cart.total_price} руб.</h3>
        <button onClick={() => alert('Покупка совершена!')}>Купить</button>
      </div>
    </div>
  );
}

export default CartContainer;
