import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html lang="tr">
                <Head>
                    {/* Bootstrap ve diğer global CSS dosyaları */}
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" />
                    {/* Diğer CSS dosyalarınızı buraya ekleyin */}
                    {/* Örnek: */}
                    {/* <link rel="stylesheet" href="/css/custom.css" /> */}
                    {/* ... diğer linkler ... */}
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
