import './CatalogContainer.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Импортируем useNavigate
import fetchData from '../../fetchData';

function CatalogContainer() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate(); // Инициализация навигации

  useEffect(() => {
    async function getCategories() {
      try {
        const categoryData = await fetchData('/product/getAllCategory');
        if (categoryData && categoryData.categories && categoryData.categories.length > 0) {
          setCategories(categoryData.categories);
        }
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    }
    getCategories();
  }, []);

  const handleCategoryClick = (categoryName) => {
    navigate('/productscategory', { state: { categoryName } }); // Передаем категорию через state
  };

  return (
    <div className="product-container">
      {categories.length > 0 ? (
        categories.map((category, index) => (
          <div
            key={index}
            className="category-block"
            onClick={() => handleCategoryClick(category.name)} // Добавляем обработчик клика
          >
            <h3>{category.name}</h3> {/* Отображаем имя категории в блоке */}
          </div>
        ))
      ) : (
        <p>Загрузка каталога...</p>
      )}
    </div>
  );
}

export default CatalogContainer;
