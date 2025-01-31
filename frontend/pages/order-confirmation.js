import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

const OrderConfirmation = () => {
    const router = useRouter();
    const { orderId } = router.query;
    const [order, setOrder] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (orderId) {
            axios.get(`https://fakestoreapi.com/carts/${orderId}`)
                .then((response) => {
                    setOrder(response.data);
                })
                .catch(() => {
                    setError("Erro ao carregar os detalhes do pedido.");
                });
        }
    }, [orderId]);

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    if (!order) {
        return <p>Carregando detalhes do pedido...</p>;
    }

    return (
        <div className="container mx-auto p-5">
            <h1 className="text-2xl font-bold mb-4">Pedido Confirmado</h1>
            <p>Seu pedido foi registrado com sucesso! ID do Pedido: {order.id}</p>
        </div>
    );
};

export default OrderConfirmation;
