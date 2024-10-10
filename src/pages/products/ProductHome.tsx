import React from 'react'
import ProductCard from '../../components/cards/ProductCard'
import { Product, ProductProps } from '../../types/productTypes';
import { useDispatch } from 'react-redux';
import { setProduct } from '../../slice/productSlice';

//TODO: NEED TO STYLE THE CARDDS, add login and signup page

export default function ProductHome() {
  const sampleProduct: Product = {
    id:1,
    name: "Ghee",
    quantity: 100,
    price: [120,140,200],
    offerpercentage: 20,
    description: "Some quick example text to build on the card title and make up the bulk of the card's content.",
    image: "path_to_image.png" ,
    quantitysize: [100,250,300],
    instock: true,
    ratings: 200,
    ratingStar: "1",
    itemQty:1,
  };
  const sampleProduct2: Product = {
    id:2,
    name: "Ghee 123",
    quantity: 250,
    price: [120,140,200],
    description: "Some quick example text to build on the card title and make up the bulk of the card's content.",
    image: "path_to_image.png" ,
    offerpercentage:40,
    quantitysize: [100,250,300],
    instock: true,
    ratings: 200,
    ratingStar: "3",
    itemQty:1,
  };

  const dispatch = useDispatch();
  dispatch(setProduct(sampleProduct));
  dispatch(setProduct(sampleProduct2));

  return (
    <div className='common-container'>
      <h1></h1>
      <div className='d-flex product-container'>
      <ProductCard product={sampleProduct} />
      <ProductCard product={sampleProduct2} />
      </div>
      
    </div>
  )
}
