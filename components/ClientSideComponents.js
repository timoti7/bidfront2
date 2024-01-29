import React, { useEffect, useState } from 'react';

const ClientSideComponent = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState('');
    const [phone, setPhone] = useState('');
    const [user_id, setId] = useState('');

    useEffect(() => {
        const storedToken = localStorage.getItem('userToken');
        const storedPhone = localStorage.getItem('userPhone');
        const userId = localStorage.getItem('userId');

        if (storedToken && storedPhone) {
            setIsLoggedIn(true);
            setToken(storedToken);
            setPhone(storedPhone);
            setId(userId);
        }
    }, []);

    return (
        <div>
            {isLoggedIn ? (
                <div>
                    <p>Login Oldunuz</p>
                    <p>Telefon: {phone}</p>
                    <p>Token: {token}</p>
                    <p>ID: {user_id}</p>
                </div>
            ) : (
                <p>Login değilsiniz</p>
            )}
        </div>
    );
};

export default ClientSideComponent;
