// pages/tasit/index.js
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function TasitListesi() {
    const [tasitlar, setTasitlar] = useState([]);

    useEffect(() => {
        // API'den taşıt verilerini çekme
        fetch('http://localhost:8000/api/tasit/')  // API URL'inizi buraya girin
            .then(response => response.json())
            .then(data => setTasitlar(data))
            .catch(error => console.error('Hata:', error));
    }, []);

    return (
        <div>
            <h1>Taşıt Listesi</h1>
            <ul>
                {tasitlar.map(tasit => (
                    <li key={tasit.id}>
                        <Link href={`/tasit/${tasit.id}`}>
                            <a>{tasit.name}</a>  {/* Taşıt adı veya başka bir özellik */}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
