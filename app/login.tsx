"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Login() {
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/api/accounts/verify-login-otp-mobile/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phone, otp }),
            });

            if (!response.ok) {
                throw new Error('Kullanıcı doğrulaması başarısız.');
            }

            const userData = await response.json();
            localStorage.setItem('userToken', userData.token);
            localStorage.setItem('userPhone', phone);
            localStorage.setItem('userId', userData.response.id); // Kullanıcı ID'sini localStorage'a kaydet

            // Ana sayfaya yönlendir
            router.push('/');
        } catch (err) {
            setError(err.message || 'Bir hata oluştu.');
        }
    };

    return (
        <div className="auth-container">
            <h2>Giriş Yap</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="tel"
                    placeholder="Telefon Numarası"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                />
                {error && <p className="error">{error}</p>}
                <button type="submit">Giriş Yap</button>
            </form>
            <Link href="/register">
                <div>Hesap Oluştur</div>
            </Link>
        </div>
    );
}
