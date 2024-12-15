import './CategoryContainer.css';
import fetchData from '../../fetchData';
import React, { useState, useEffect } from 'react';

function CategoryComponent() {
  const [categories, setCategories] = useState([]);
  const [startIndex, setStartIndex] = useState(0); // Начальный индекс для отображаемых категорий
  const itemsPerPage = 5; // Количество отображаемых категорий

  useEffect(() => {
    async function getAllCategory() {
      const data = await fetchData('/product/getAllCategory');
      setCategories(data.categories);
    }
    getAllCategory();
  }, []);

  // Функция для переключения категорий влево
  const handleScrollLeft = () => {
    setStartIndex((prevIndex) =>
      Math.max(prevIndex - itemsPerPage, 0) // Не выходить за пределы
    );
  };

  // Функция для переключения категорий вправо
  const handleScrollRight = () => {
    setStartIndex((prevIndex) =>
      Math.min(prevIndex + itemsPerPage, categories.length - itemsPerPage)
    );
  };

  return (
    <div className="container">
      <button
        className="scroll-button left-scroll"
        onClick={handleScrollLeft}
        disabled={startIndex === 0} // Отключить кнопку, если уже в начале
      >
        ←
      </button>
      <div className="category-list">
        {categories.length > 0 ? (
          categories
            .slice(startIndex, startIndex + itemsPerPage) // Показываем только нужные категории
            .map((category, index) => (
              <div key={index} className="category-item">
                {category.name}
              </div>
            ))
        ) : (
          <p>Загрузка категорий...</p>
        )}
      </div>
      <button
        className="scroll-button right-scroll"
        onClick={handleScrollRight}
        disabled={startIndex + itemsPerPage >= categories.length} // Отключить кнопку, если в конце
      >
        →
      </button>
    </div>
  );
}

export default CategoryComponent;
