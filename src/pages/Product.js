import React from 'react';
import { useParams } from 'react-router-dom';
import ProductContainer from '../components/ProductContainer/ProductContainer';

function Product() {
  const { id } = useParams(); // Получаем ID продукта из URL
    
  return <ProductContainer id={id} />;
}

export default Product;
