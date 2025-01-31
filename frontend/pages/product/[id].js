'use client';  // Adiciona a diretiva para garantir que esse componente será renderizado no cliente.

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router'; // Importa o hook para acessar parâmetros da rota.
import Image from 'next/image';
import { useCart } from '../../contexts/CartContext'; // Importa o contexto do carrinho


const ProductDetail = () => {
    const [product, setProduct] = useState(null); // Estado para armazenar os detalhes do produto
    const [error, setError] = useState(null); // Estado para erros
    const router = useRouter(); // Hook para acessar parâmetros da rota
    const { id } = router.query; // Extraindo o ID da URL
    const { addToCart } = useCart(); // Acessa a função addToCart do CartContext

    useEffect(() => {
        if (id) {
            // Faz a requisição para buscar o produto baseado no ID
            axios.get(`https://fakestoreapi.com/products/${id}`)
                .then((response) => {
                    setProduct(response.data); // Armazena os dados do produto
                    setError(null); // Reseta o erro, caso haja
                })
                .catch((error) => {
                    console.error('Erro ao buscar o produto:', error);
                    setError('Falha ao carregar detalhes do produto. Tente novamente mais tarde.');
                });
        }
    }, [id]); // O useEffect depende do parâmetro 'id' para disparar a requisição

    const handleAddToCart = () => {
        addToCart(product); // Adiciona o produto ao carrinho
    };

    if (error) {
        return <p className="text-red-500">{error}</p>; // Exibe o erro, caso ocorra
    }

    if (!product) {
        return <p>Carregando...</p>; // Exibe um texto enquanto os dados do produto estão sendo carregados
    }

    return (
        <div className="container mx-auto p-5">
            <h1 className="text-2xl font-bold mb-4">{product.title}</h1> {/* Exibe o título do produto */}
            <Image
                src={product.image}
                alt={product.title}
                width={400} // Ajuste conforme necessário
                height={400}
                className="w-full h-48 object-contain"
            />
            <p className="text-gray-600"><b>Categoria:</b> {product.category}</p> {/* Exibe a categoria do produto */}
    
            <p className="text-gray-700"><b>R$ {product.price.toFixed(2)}</b></p> {/* Exibe o preço do produto */}
            <p className="text-gray-600 mt-4">{product.description}</p> {/* Exibe a descrição do produto */}
            <p className="text-gray-600"><b>Avaliação:</b> {product.rating.rate} ({product.rating.count} avaliações)</p> {/* Exibe a avaliação do produto */}
            
            <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleAddToCart} // Função para adicionar o produto ao carrinho
            >
                Adicionar ao Carrinho
            </button>
        </div>
    );
};

export default ProductDetail;
