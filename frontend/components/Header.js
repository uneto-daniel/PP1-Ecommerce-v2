// components/Header.js
import Link from 'next/link';
import { useCart } from '../contexts/CartContext';

const Header = () => {
    const { cart } = useCart();  // Acessa o carrinho para mostrar a quantidade de itens

    return (
        <header className="bg-blue-500 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-white text-2xl font-bold">Império K7</h1>
                <nav>
                    <ul className="flex space-x-4">
                        <li>
                            <Link href="/" className="text-white hover:text-gray-300">
                                Página Inicial
                            </Link>
                        </li>
                        <li>
                            <Link href="/cart" className="text-white hover:text-gray-300">
                                Carrinho ({cart.length})
                            </Link>
                        </li>
                        <li>
                            <Link href="/products" className="text-white hover:text-gray-300">
                                Produtos
                            </Link>
                        </li>
                        <li>
                            <Link href="/login.js" className="text-white hover:text-gray-300">
                                Login
                            </Link>
                        </li><li>
                            <Link href="/register.js" className="text-white hover:text-gray-300">
                                Cadastrar
                            </Link>
                        </li>
                        <li>
                            <Link href="/UserProfile" className="text-white hover:text-gray-300">
                                Perfil
                            </Link>
                        </li>
                        <li>
                            <Link href="/checkout" className="text-white hover:text-gray-300">
                                Checkout
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
