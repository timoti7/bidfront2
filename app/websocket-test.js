// pages/websocket-test.js
import React, { useEffect, useState } from 'react';

export default function WebSocketTest() {
    const [message, setMessage] = useState('');
    const [receivedMessages, setReceivedMessages] = useState([]);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // WebSocket bağlantısını aç
        const ws = new WebSocket('ws://localhost:8000/ws/bidding/');

        ws.onopen = () => {
            console.log('WebSocket bağlantısı açıldı');
        };

        ws.onmessage = (e) => {
            setReceivedMessages(prev => [...prev, e.data]);
        };

        ws.onclose = () => {
            console.log('WebSocket bağlantısı kapandı');
        };

        setSocket(ws);

        // Bağlantıyı kapat
        return () => {
            ws.close();
        };
    }, []);

    const sendMessage = () => {
        if (socket) {
            socket.send(JSON.stringify({ message }));
            setMessage('');
        }
    };

    return (
        <div>
            <h1>WebSocket Test Sayfası</h1>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Mesaj Gönder</button>
            <div>
                <h2>Alınan Mesajlar:</h2>
                {receivedMessages.map((msg, index) => (
                    <p key={index}>{msg}</p>
                ))}
            </div>
        </div>
    );
}
