import './CategoryContainer.css';
import fetchData from '../../fetchData';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CategoryComponent() {
  const [categories, setCategories] = useState([]);
  const [startIndex, setStartIndex] = useState(0); 
  const itemsPerPage = 5;  // Количество элементов на странице
  const navigate = useNavigate(); // Инициализация навигации

  // Загрузка всех категорий при монтировании компонента
  useEffect(() => {
    async function getAllCategory() {
      const data = await fetchData('/product/getAllCategory');
      setCategories(data.categories);
    }
    getAllCategory();
  }, []);

  // Функция для прокрутки влево
  const handleScrollLeft = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - itemsPerPage, 0));
  };

  // Функция для прокрутки вправо
  const handleScrollRight = () => {
    setStartIndex((prevIndex) =>
      Math.min(prevIndex + itemsPerPage, categories.length - itemsPerPage)
    );
  };

  // Обработчик клика по категории
  const handleCategoryClick = async (categoryName) => {
    try {
      const data = await fetchData('/product/getProductsByCategory', 'POST', { categoryName });
      navigate('/productscategory', { state: { products: data.products, categoryName } }); // Переход с передачей данных
    } catch (error) {
      console.error('Ошибка при загрузке товаров категории:', error);
    }
  };

  return (
    <div className="category-container" >
      {/* Кнопка прокрутки влево */}
      <button
        className="scroll-button left-scroll"
        onClick={handleScrollLeft}
        disabled={startIndex === 0}
      >
        ←
      </button>

      {/* Список категорий с прокруткой */}
      <div className="category-list">
        {categories.length > 0 ? (
          categories
            .slice(startIndex, startIndex + itemsPerPage)
            .map((category, index) => (
              <div
                key={index}
                className="category-item"
                onClick={() => handleCategoryClick(category.name)}
              >
                {category.name}
              </div>
            ))
        ) : (
          <p>Загрузка категорий...</p>
        )}
      </div>

      {/* Кнопка прокрутки вправо */}
      <button
        className="scroll-button right-scroll"
        onClick={handleScrollRight}
        disabled={startIndex + itemsPerPage >= categories.length}
      >
        →
      </button>
    </div>
  );
}

export default CategoryComponent;
