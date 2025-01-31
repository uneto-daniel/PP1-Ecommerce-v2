'use client'; // Garantir que o componente seja renderizado no cliente

import Image from 'next/image';
import { useCart } from '../contexts/CartContext';
import Link from 'next/link';

const Cart = () => {
    const { cart, removeFromCart, getTotal } = useCart();

    return (
        <div className="container mx-auto p-5">
            <h1 className="text-2xl font-bold mb-4">Carrinho de Compras</h1>

            {cart.length === 0 ? (
                <p className="text-gray-600">Seu carrinho está vazio.</p>
            ) : (
                <>
                    <div className="grid grid-cols-1 gap-4">
                        {cart.map((item) => (
                            <div key={item.id} className="border rounded-lg p-4 shadow">
                                <Image
                                    src={item.image} // URL da imagem
                                    alt={item.title}
                                    width={200}  // Largura da imagem (ajuste conforme necessário)
                                    height={200} // Altura da imagem (ajuste conforme necessário)
                                    className="w-full h-48 object-contain"
                                />
                                <h5 className="text-lg font-semibold mt-2">{item.title}</h5>
                                <p className="text-gray-700">R$ {item.price.toFixed(2)}</p>
                                <button
                                    className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
                                    onClick={() => removeFromCart(item.id)}
                                >
                                    Remover do Carrinho
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4">
                        <p className="font-bold">Total: R$ {getTotal().toFixed(2)}</p>
                        <Link href="/checkout">
                            <button className="mt-2 bg-green-500 text-white px-4 py-2 rounded">
                                Finalizar Compra
                            </button>
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
