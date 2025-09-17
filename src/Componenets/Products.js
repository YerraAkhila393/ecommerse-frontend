import axios from 'axios';
import { useState, useEffect } from 'react';

function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);
  return (
    <div>
      {products.map(product => <div key={product.id}>{product.name} - ${product.price}</div>)}
    </div>
  );
}
export default Products;