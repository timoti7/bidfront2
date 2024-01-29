// pages/products.js
import React, { useEffect, useState } from 'react';

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/products/')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div>
      <h1>Ürünler</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - Başlangıç Fiyatı: {product.start_price}
            {/* Diğer detaylar */}
          </li>
        ))}
      </ul>
    </div>
  );
}
