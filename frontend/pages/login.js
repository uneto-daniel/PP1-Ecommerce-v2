'use client';  // Certifique-se de que o componente será renderizado no cliente.

import { useState } from 'react';
import { useRouter } from 'next/router'; // Para redirecionar após login
import Link from 'next/link';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Simulação de login, substitua com a sua lógica de autenticação
        if (email === 'test@example.com' && password === 'password') {
            // Redireciona para a página principal após login
            router.push('/dashboard');
        } else {
            setError('Credenciais inválidas');
        }
    };

    return (
        <div className="container mx-auto p-5 max-w-sm">
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            {error && <p className="text-red-500">{error}</p>}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">E-mail</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700">Senha</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded"
                >
                    Entrar
                </button>
            </form>

            <p className="mt-4 text-center">
                Não tem uma conta? <Link href="/register"><a className="text-blue-500">Cadastre-se</a></Link>
            </p>
        </div>
    );
};

export default Login;
