import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import fetchData from '../../fetchData';
import './ProductsCategoryContainer.css';

function ProductsCategoryContainer() {
  const [products, setProducts] = useState([]);
  const location = useLocation(); // Получение данных из state при переходе
  const navigate = useNavigate();

  useEffect(() => {
    // Проверяем, переданы ли данные через state
    const categoryName = location.state?.categoryName;
    if (categoryName) {
      async function getProductsByCategory() {
        try {
          const data = await fetchData('/product/getProductsByCategory', 'POST', { categoryName });
          if (data && data.products) {
            setProducts(data.products);
          }
        } catch (error) {
          console.error('Ошибка при загрузке товаров:', error);
        }
      }
      getProductsByCategory();
    } else {
      console.warn('Категория не указана. Перенаправление на главную страницу.');
      navigate('/'); // Перенаправление на главную, если нет категории
    }
  }, [location.state, navigate]);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`); // Переход на страницу продукта
  };

  return (
    <div className="products-category-container">
      {products.length > 0 ? (
        <div className="product-list">
          {products.map((product) => (
            <div key={product.productId} className="product-card">
              <img
                src={product.image_url}
                alt={product.name}
                onClick={() => handleProductClick(product.productId)}
              />
              <h3>{product.name}</h3>
              <p className="price">Цена: {product.price}₽</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Загрузка товаров...</p>
      )}
    </div>
  );
}

export default ProductsCategoryContainer;
