// pages/products/[id].js
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function ProductDetail() {
  const [product, setProduct] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8000/api/urunler/${id}/`)
        .then(response => response.json())
        .then(data => setProduct(data));
    }
  }, [id]);

  if (!product) return <div>Yükleniyor...</div>;

  return (
    <div>
      <h1>{product.name}</h1>
      {/* Ürün detaylarını burada göster */}
    </div>
  );
}
