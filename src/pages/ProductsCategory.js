import React from 'react';
import { useParams } from 'react-router-dom';
import ProductsCategoryContainer from '../components/ProductsCategoryContainer/ProductsCategoryContainer';

function ProductsCategory() {
  const { id } = useParams(); // Получаем ID продукта из URL
    
  return <ProductsCategoryContainer id={id} />;
}

export default ProductsCategory;
