// pages/emlak/index.js
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function EmlakListesi() {
    const [emlaklar, setEmlaklar] = useState([]);

        useEffect(() => {
            fetch('http://localhost:8000/api/emlak/')
                .then(response => response.json())
                .then(data => {
                    console.log(data);  // Veriyi konsolda loglayın
                    setEmlaklar(data);
                })
                .catch(error => console.error('Hata:', error));
        }, []);
    

    return (
        <div>
            <h1>Emlak Listesi</h1>
            <ul>
                {emlaklar.map(emlak => (
                    <li key={emlak.id}>
                        <Link href={`/emlak/${emlak.id}`}>
                            ID: {emlak.id}, Konum: {emlak.location}
                        </Link>
                    </li>
                ))}
            </ul>



        </div>
    );
}
