import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import fetchData from '../../fetchData';
import './ProductCardContainer.css';

function ProductCardContainer() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getProducts() {
      const data = await fetchData('/product/getPopProducts');
      if (data && data.products && data.products.length > 0) {
        setProducts(data.products);
      }
    }
    getProducts();
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`); // Переход на страницу продукта
  };

  return (
    <div className="product-container">
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product.productId} className="card">
            <img
              alt={product.name}
              src={product.image_url}
              onClick={() => handleProductClick(product.productId)}
            />
            <h3>{product.name}</h3>
            <p className="price">Цена: {product.price}₽</p>
            <button className='product-container-button'>Добавить в корзину</button>
          </div>
          
        ))
      ) : (
        <p>Загрузка товаров...</p>
      )}
    </div>
  );
}

export default ProductCardContainer;
