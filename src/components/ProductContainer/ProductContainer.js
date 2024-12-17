import React, { useState, useEffect } from 'react';
import './ProductContainer.css';
import fetchData from '../../fetchData';
import useStorage from '../../useStorage';

function ProductContainer({ id }) {
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [token] = useStorage('token', null, 'sessionStorage'); // Вызов useStorage на верхнем уровне
  useEffect(() => {
    async function getProduct() {
      const data = await fetchData('/product/getProduct', 'POST', { productId: Number(id) });
      setProduct(data);
      console.log(data);
    }
    getProduct();
  }, [id]);

  const chooseSize = (size) => {
    setSelectedSize(size);
  };

  const addToCart = async () => {
    if (!selectedSize) {
      alert('Выберите размер');
      return;
    }

    try {
      await fetchData(
          '/cart/addToCart',
          'POST',
          { productId: Number(id), size: selectedSize },
          { Authorization: token }
      );
      alert('Товар добавлен в корзину');
  } catch (error) {
      console.error('Ошибка при добавлении в корзину:', error);
      alert('Вы не авторизированы! Войдите в личный кабинет!');
  }
  

  };  

  if (!product) {
    return <div>Загрузка...</div>;
  }

  return (
    <>
      <div className='product-container'>
        <img
          className='product-image'
          alt={product.name}
          src={product.image_url}
        />
        <div className='product-info'>
          <h1>{product.name}</h1>
          <p className='additional_info'>{product.description.additional_info}</p>
          <p>Пол: {product.description.gender}</p>
          <p>Цвет: {product.description.color}</p>
          <p>Материал: {product.description.material}</p>
          <p>Размеры:</p>
          <div className='product-sizes'>
            {product.sizes.map((size, index) => (
              <span
                key={index}
                className={`size-box ${selectedSize === size ? 'selected' : ''}`}
                onClick={() => chooseSize(size)}
              >
                {size}
              </span>
            ))}
          </div>
          <p>Цена: {product.price}₽</p>
        </div>
      </div>
      <div className='product-buttons'>
        <button className='cart-button' onClick={addToCart}>
          Добавить в корзину
        </button>
        <button className='favorites-button'>В избранное</button>
      </div>
    </>
  );
}

export default ProductContainer;
