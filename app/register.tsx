"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Register() {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const otp = '1234'; // OTP'yi otomatik olarak ayarla

        try {
            const response = await fetch('http://127.0.0.1:8000/api/accounts/user-register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fname, lname, email, phone, otp }),
            });

            if (!response.ok) {
                throw new Error('Kayıt işlemi başarısız.');
            }

            // Kayıt başarılıysa, kullanıcıyı giriş sayfasına yönlendir
            router.push('/login');
        } catch (err) {
            setError(err.message || 'Bir hata oluştu.');
        }
    };

    return (
        <div className="auth-container">
            <h2>Kayıt Ol</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Ad"
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Soyad"
                    value={lname}
                    onChange={(e) => setLname(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="E-posta"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="tel"
                    placeholder="Telefon Numarası"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                {error && <p className="error">{error}</p>}
                <button type="submit">Kayıt Ol</button>
            </form>
            <Link href="/login">
                <div>Giriş Yap</div>
            </Link>
        </div>
    );
}
