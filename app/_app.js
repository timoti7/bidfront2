// pages/_app.js
// import { UserProvider } from '../context/UserContext';
import '../styles/bootstrap.min.css'; // Dosyanın kaydedildiği yola göre değişebilir

// import 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css'; // Bootstrap CSS

function MyApp({ Component, pageProps }) {
    return (
        <>

            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
