import { CartProvider } from '../contexts/CartContext'; // Importa o CartContext
import "@/styles/globals.css"; // Estilos globais
import Header from '../components/Header'; // Importa o Header

function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <Header />
      <Component {...pageProps} />
    </CartProvider>
  );
}

export default MyApp;
