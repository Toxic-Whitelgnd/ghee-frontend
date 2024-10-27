import { useEffect, useState } from 'react';
import ProductCard from '../../components/cards/ProductCard';
import { useSelector } from 'react-redux';
import { selectProducts } from '../../slice/productSlice';
import Loader from "../../components/cards/Loader"; // Import your Loader component
import { Client, urlFor } from '../../lib/client';
import { ProductFromSanity } from '../../types/productTypes';



export default function ProductHome() {
  const [searchTerm, setSearchTerm] = useState<string>(''); // State for search term
  const [loading, setLoading] = useState<boolean>(false); // State for loading

  const products = useSelector(selectProducts); // Fetch all products from Redux store

  // Filtered products based on search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const [productstest, setProducts] = useState<ProductFromSanity[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: ProductFromSanity[] = await Client.fetch(
          `*[_type == "product"] {
            _id,
            name,
            offerpercentage,
            instock,
            ratings,
            ratingStar,
            description,
            price,
            quantitysize,
            images
          }`
        );
        console.log('Fetched data:', data);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  
  

  return (
    <div className='common-container'>
      <div className='d-flex'>
        <h1 className='ms-4'>Products</h1>

        <div className="search-box ms-lg-5">
          <button className="btn-search"><i className="fas fa-search"></i></button>
          <input type="text" className="input-search" placeholder="Search products by name..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>


      {loading ? (
        <Loader />
      ) : (
        <div className='d-flex product-container'>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((x) => (
              <ProductCard key={x._id} product={x} /> // Ensure unique key for each product
            ))
          ) : (
            <p>No products found</p>
          )}
        </div>
      )}
    </div>
  );
}
