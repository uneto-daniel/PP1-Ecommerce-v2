import { useCart } from '../contexts/CartContext';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import axios from 'axios';

const Checkout = () => {
    const { cart, clearCart } = useCart();
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter();

    // Calcula o total do pedido
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    const handleCheckout = async () => {
        if (cart.length === 0) {
            setError("Seu carrinho está vazio.");
            return;
        }

        setIsProcessing(true);
        setError(null);

        try {
            // Simulação de criação do pedido usando a API FakeStore
            const response = await axios.post('https://fakestoreapi.com/carts', {
                userId: 1, // O ID do usuário deve ser obtido da autenticação real
                date: new Date().toISOString().split('T')[0], // Formato YYYY-MM-DD
                products: cart.map(item => ({
                    productId: item.id,
                    quantity: item.quantity
                }))
            });

            console.log("Pedido realizado:", response.data);

            clearCart(); // Limpa o carrinho após a compra
            router.push(`/order-confirmation?orderId=${response.data.id}`); // Redireciona para a página de confirmação
        } catch (err) {
            console.error(err);
            setError("Erro ao processar o pedido. Tente novamente.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="container mx-auto p-5">
            <h1 className="text-2xl font-bold mb-4">Checkout</h1>

            {error && <p className="text-red-500">{error}</p>}

            {cart.length === 0 ? (
                <p className="text-gray-600">Seu carrinho está vazio.</p>
            ) : (
                <div>
                    {cart.map((item) => (
                        <div key={item.id} className="flex items-center border-b py-4">
                            <Image src={item.image} alt={item.title} width={80} height={80} className="mr-4" />
                            <div>
                                <h5 className="text-lg font-semibold">{item.title}</h5>
                                <p className="text-gray-700">Quantidade: {item.quantity}</p>
                                <p className="text-gray-700">Preço: R$ {item.price.toFixed(2)}</p>
                            </div>
                        </div>
                    ))}

                    <div className="mt-4 text-lg font-semibold">
                        Total: R$ {totalPrice.toFixed(2)}
                    </div>

                    <button
                        className={`mt-4 px-4 py-2 rounded text-white ${isProcessing ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'}`}
                        onClick={handleCheckout}
                        disabled={isProcessing}
                    >
                        {isProcessing ? "Processando..." : "Finalizar Pedido"}
                    </button>
                </div>
            )}
        </div>
    );
};

export default Checkout;