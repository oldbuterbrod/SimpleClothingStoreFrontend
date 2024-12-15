import React from 'react';
import StoreDescription from '../components/StoreDescription/StoreDescription'
import CategoryContainer from '../components/CategoryContainer/CategoryContainer'
import ProductCardContainer from '../components/ProductCardContainer/ProductCardContainer';




function Home() {

  
  return (
    <>
      
      <StoreDescription/>
      <CategoryContainer />
      <ProductCardContainer />
    </>
  );
}

export default Home;