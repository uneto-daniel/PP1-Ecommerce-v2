'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaUser, FaEnvelope } from 'react-icons/fa';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/users/1'); // Simula um usuário logado
                if (!response.ok) throw new Error('Erro ao buscar os dados do usuário');
                const data = await response.json();
                setUser(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    if (loading) return <p>Carregando perfil...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="container mx-auto p-6 max-w-lg">
            <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4 text-center">Perfil do Usuário</h2>
                <div className="flex justify-center mb-4">
                    <Image
                        src="/user-placeholder.png" // Adicione uma imagem padrão ou use um avatar dinâmico
                        alt="User Avatar"
                        width={100}
                        height={100}
                        className="rounded-full"
                    />
                </div>
                <p className="text-lg flex items-center"><FaUser className="mr-2" /> <strong>Nome:</strong> {user.name.firstname} {user.name.lastname}</p>
                <p className="text-lg flex items-center"><FaEnvelope className="mr-2" /> <strong>Email:</strong> {user.email}</p>
                <p className="text-lg"><strong>Telefone:</strong> {user.phone}</p>
                <p className="text-lg"><strong>Endereço:</strong> {user.address.street}, {user.address.city}</p>

                <button
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded w-full"
                    onClick={() => router.push('/logout')} // Redireciona para logout
                >
                    Sair da Conta
                </button>
            </div>
        </div>
    );
};

export default UserProfile;
