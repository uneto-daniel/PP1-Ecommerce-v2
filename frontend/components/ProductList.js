import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductItem from '../components/ProductItem';
import { FaSearch } from 'react-icons/fa'; 

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('https://fakestoreapi.com/products')
            .then((response) => {
                setProducts(response.data);
                setError(null);
            })
            .catch((error) => {
                setError('Erro ao carregar a lista de produtos. Tente novamente mais tarde.');
                console.error(error);
            });
    }, []);

    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="container mx-auto p-5">
            <h1 className="text-2xl font-bold mb-4">Produtos</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((item) => (
                    <ProductItem key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
};

export default ProductList;
