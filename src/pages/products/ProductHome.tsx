import { useEffect, useState } from 'react';
import ProductCard from '../../components/cards/ProductCard';
import { Product } from '../../types/productTypes';
import { useDispatch } from 'react-redux';
import { setProduct } from '../../slice/productSlice';
import { productServiceGet } from '../../services/apiServices';
import Loader from "../../components/cards/Loader"; // Import your Loader component

export default function ProductHome() {
  const [products, setProducts] = useState<Product[] | null>([]);
  const [loading, setLoading] = useState<boolean>(true); // New state for loading

  const dispatch = useDispatch();

  const fetchProducts = async () => {
    setLoading(true); // Start loader
    const res = await productServiceGet();
    if (res !== undefined) {
      setProducts(res);
      console.log(res);
      res.forEach(p => dispatch(setProduct(p)));
    }
    setLoading(false); // Stop loader once data is fetched
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className='common-container'>
      <h1>Products</h1>
      {loading ? ( // Show loader if loading is true
        <Loader />
      ) : (
        <div className='d-flex product-container'>
          {products?.map((x) => (
            <ProductCard key={x.id} product={x} /> // Ensure each item has a unique key
          ))}
        </div>
      )}
    </div>
  );
}
