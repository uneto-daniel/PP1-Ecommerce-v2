'use client';  // Garantir que o componente seja renderizado no cliente

import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductItem from '../components/ProductItem'; // Importa o componente para exibir cada produto
import Image from 'next/image'; // Para usar o componente Image do Next.js

const Products = () => {
    const [items, setItems] = useState([]); // Estado para armazenar os produtos
    const [searchTerm, setSearchTerm] = useState(''); // Estado para armazenar o termo de busca
    const [error, setError] = useState(null); // Estado para armazenar erros de requisição

    // Hook useEffect para buscar os produtos da API quando o componente for montado
    useEffect(() => {
        axios.get('https://fakestoreapi.com/products')
            .then((response) => {
                setItems(response.data); // Atualiza o estado com os produtos
                setError(null); // Reseta o erro caso a requisição seja bem-sucedida
            })
            .catch((error) => {
                console.error('Erro ao buscar produtos:', error);
                setError('Falha ao carregar produtos. Tente novamente mais tarde.'); // Exibe um erro se a requisição falhar
            });
    }, []); // O array vazio [] garante que o efeito só será executado uma vez ao montar o componente

    // Filtra os produtos com base no termo de busca
    const filteredItems = items.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) // Ignora maiúsculas/minúsculas
    );

    // Função para agrupar os produtos por categoria
    const groupByCategory = (products) => {
        return products.reduce((acc, product) => {
            const { category } = product;
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(product);
            return acc;
        }, {});
    };

    // Agrupando os produtos por categoria
    const groupedItems = groupByCategory(filteredItems);

    return (
        <div className="container mx-auto p-5">
            <h1 className="text-2xl font-bold mb-4">Produtos por Categoria</h1>
            {error && <p className="text-red-500">{error}</p>} {/* Exibe erro, se houver */}

            <div className="mb-4">
                <div className="relative">
                    <input
                        type="text"
                        className="w-full p-2 border rounded"
                        placeholder="Pesquisar produtos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o termo de busca
                    />
                </div>
            </div>

            {Object.keys(groupedItems).length === 0 ? (
                <p className="text-gray-600">Nenhum produto encontrado.</p>
            ) : (
                Object.keys(groupedItems).map((category) => (
                    <div key={category} className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">{category}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {groupedItems[category].map((item) => (
                                <ProductItem key={item.id} item={item} />
                            ))}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Products;
