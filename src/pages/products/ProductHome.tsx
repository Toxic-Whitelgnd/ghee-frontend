import React from 'react'
import ProductCard from '../../components/cards/ProductCard'
import { ProductProps } from '../../types/productTypes';

//TODO: NEED TO STYLE THE CARDDS, add login and signup page

export default function ProductHome() {
  const sampleProduct: ProductProps = {
    id:1,
    name: "Ghee",
    quantity: 100,
    price: 20,
    description: "Some quick example text to build on the card title and make up the bulk of the card's content.",
    image: "path_to_image.png" 
  };
  const sampleProduct2: ProductProps = {
    id:2,
    name: "Ghee 123",
    quantity: 50,
    price: 10,
    description: "Some quick example text to build on the card title and make up the bulk of the card's content.",
    image: "path_to_image.png" 
  };
  return (
    <div>
      <h1>Ghee products will be displayed here</h1>
      <div className='d-flex'>
      <ProductCard product={sampleProduct} />
      <ProductCard product={sampleProduct2} />
      </div>
      
    </div>
  )
}
