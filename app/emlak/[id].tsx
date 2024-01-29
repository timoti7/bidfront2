"use client";
import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const ClientSideComponent = dynamic(() => import('@/components/ClientSideComponents'), { ssr: false });

export default function EmlakDetay() {
    const [emlak, setEmlak] = useState(null);
    const [teklif, setTeklif] = useState('');
    const [teklifler, setTeklifler] = useState([]);
    const ws = useRef(null);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (id) {
            fetchEmlakVeTeklifler();
            setupWebSocket();
        }

        return () => {
            if (ws.current) {
                ws.current.close();
            }
        };
    }, [id]);

    // Tekliflerin içeriğini konsola yazdır
    useEffect(() => {
        console.log('Teklifler:', teklifler);
    }, [teklifler]);

    const fetchEmlakVeTeklifler = () => {
        fetch(`http://localhost:8000/api/emlak/${id}/`)
            .then(response => response.json())
            .then(data => {
                setEmlak(data);
                return fetch(`http://localhost:8000/api/emlak/${id}/teklifler/`, {
                    headers: {
                        'Authorization': `Token ${localStorage.getItem('userToken')}`
                    }
                });
            })
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setTeklifler(data);
                }
            })
            .catch(error => console.error('Hata:', error));
    };

    const setupWebSocket = () => {
        ws.current = new WebSocket(`ws://localhost:8000/ws/auction/${id}/`);
        ws.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setTeklifler(prevTeklifler => [...prevTeklifler, data.message]);
        };
        ws.current.onopen = () => console.log('WebSocket açıldı');
        ws.current.onerror = (event) => {
            console.error('WebSocket error:', event);
        };
        ws.current.onclose = () => console.log('WebSocket kapandı');
    };

    const handleTeklifGonder = () => {
        if (!teklif) {
            console.error('Teklif boş olamaz');
            return;
        }
    
        const token = localStorage.getItem('userToken');
        const userId = localStorage.getItem('userId'); // Kullanıcı ID'si, localStorage'dan alınır.
    
        if (!token || !userId) {
            console.error('Kullanıcı giriş yapmalı ve kullanıcı ID bilgisi olmalı');
            return;
        }
    
        // Veritabanına teklif kaydetme işlemi
        fetch(`http://localhost:8000/api/emlak/${id}/teklifler/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify({
                product: parseInt(id), // Ürün ID'si, bu sayfanın id'si. Sayısal değere dönüştürüldü.
                user: parseInt(userId), // Kullanıcı ID'si. Sayısal değere dönüştürüldü.
                amount: parseFloat(teklif) // Teklif miktarı. Ondalıklı sayıya dönüştürüldü.
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Teklif gönderme başarısız');
            }
            return response.json();
        })
        .then(data => {
            console.log('Teklif başarıyla gönderildi:', data);
            setTeklif('');
        
            // Teklif listesini güncelle
            setTeklifler(prevTeklifler => [
                ...prevTeklifler, 
                `Teklif: ${data.amount} (ID: ${data.id}) (Kullanıcı: ${data.user})` // Teklifi string olarak ekle
            ]);
        })
        
        .catch(error => console.error('Teklif gönderme hatası:', error));
    };
    
    
    
    
    
    return (
        <div>
            <h1>Emlak Detayı</h1>
            {emlak && (
                <>
                    <p>ID: {emlak.id}</p>
                    <p>Konum: {emlak.location}</p>
                    {/* Diğer emlak bilgileri */}
                </>
            )}
            <div>
                <input
                    type="number"
                    value={teklif}
                    onChange={(e) => setTeklif(e.target.value)}
                    placeholder="Teklifinizi girin"
                />
                <button onClick={handleTeklifGonder}>Teklif Gönder</button>
            </div>
            <div>
                <h2>Teklifler</h2>
                <ul>
                {teklifler.map((tek, index) => {
                    if (typeof tek === 'object') {
                        // Eğer 'tek' bir nesne ise, özelliklerine eriş
                        return (
                            <li key={index}>
                                Teklif: {tek.amount} TL (Kullanıcı ID: {tek.user})
                            </li>
                        );
                    } else {
                        // Eğer 'tek' bir string ise, doğrudan göster
                        return <li key={index}>{tek}</li>;
                    }
                })}

                </ul>
            </div>
            <Link href="/emlak">Emlak Listesine Geri Dön</Link>
            <ClientSideComponent />
        </div>
    );
   
}
