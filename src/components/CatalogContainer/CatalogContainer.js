import './CatalogContainer.css';
import React, { useState, useEffect } from 'react';
import fetchData from '../../fetchData';

function CatalogContainer() {
   const [categories, setCategories] = useState([]);
   const [images, setImages] = useState([]);

  useEffect(() => {
    async function getCategories() {
      const data = await fetchData('/product/getAllCategory');
      const images_url = await fetchData('/product/getPopProducts');
      if (data && data.categories && data.categories.length > 0) {
        setCategories(data.categories);
        setImages(images_url.products.map(product => product.image_url));
        console.log(images_url.products)
      }
    }
    getCategories();
  }, []);

  return (
    <div className="product-container">
      {categories.length > 0 ? (
        categories.map((categorie, index) => (
          <div key={index} className="card">    
             <img alt={categorie.name} src={images[index]} /> 
            <h3>{categorie.name}</h3>
          </div>
        ))
      ) : (
        <p>Загрузка каталога...</p>
      )}
    </div>
  );
}

export default CatalogContainer;
