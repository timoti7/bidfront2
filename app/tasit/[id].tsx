// pages/vahicle/[id].js
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import dynamic from 'next/dynamic';

const ClientSideComponent = dynamic(() => import('@/components/ClientSideComponents'), { ssr: false });


export default function OtoDetail() {
  const [oto, setOto] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    fetch(`http://localhost:8000/api/tasit/${id}/`)
      .then(response => response.json())
      .then(data => setOto(data));
  }, [id]);

  if (!oto) return <div>Yükleniyor...</div>;

  return (
    <div>
      <h1>{oto.name}</h1>
      {/* Otomobil detay içeriği */}
      <ClientSideComponent />
    </div>

  );
}
