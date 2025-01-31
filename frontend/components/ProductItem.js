import { useCart } from '../contexts/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { FaStar, FaRegStar } from 'react-icons/fa'; // Ícones de estrela

const ProductItem = ({ item }) => {
    const { addToCart } = useCart();

    // Garantir que a avaliação seja um número válido entre 0 e 5
    const rating = item.rating && item.rating >= 0 && item.rating <= 5 ? item.rating : 0;

    return (
        <div key={item.id} className="border rounded-lg p-4 shadow">
            <Image
                src={item.image}
                alt={item.title}
                width={200}
                height={200}
                className="w-full h-48 object-contain"
            />
            <h5 className="text-lg font-semibold mt-2">{item.title}</h5>
            
            <div className="flex items-center mt-2">
                {/* Exibe as estrelas preenchidas e vazias conforme a avaliação */}
                {[1, 2, 3, 4, 5].map((star) =>
                    star <= rating ? (
                        <FaStar key={star} color="#ffbb33" />
                    ) : (
                        <FaRegStar key={star} color="#ffbb33" />
                    )
                )}
            </div>

            <span className="block mt-2">Categoria: {item.category}</span>

            <p className="text-gray-700 mt-2">R$ {item.price.toFixed(2)}</p>

            <button
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => addToCart(item)}
            >
                Adicionar ao Carrinho
            </button>

            <div className="mt-2"></div>

            <Link href={`/product/${item.id}`}>
                <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
                    Ver Detalhes
                </button>
            </Link>

            {/* Exibindo as avaliações do produto, se houver */}
            <div className="mt-4">
                <h6 className="font-semibold">Avaliações:</h6>
                {item.reviews && item.reviews.length > 0 ? (
                    <ul className="list-disc pl-4">
                        {item.reviews.map((review, index) => (
                            <li key={index} className="text-sm">
                                <strong>{review.author}:</strong> {review.comment}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-sm text-gray-500">Ainda não há avaliações para este produto.</p>
                )}
            </div>
        </div>
    );
};

export default ProductItem;
