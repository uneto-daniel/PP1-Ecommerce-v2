'use client';  // Certifique-se de que o componente será renderizado no cliente.

import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('As senhas não coincidem');
            return;
        }

        // Aqui você pode fazer a chamada à API para registrar o usuário.
        // Simulação de sucesso de cadastro:
        setTimeout(() => {
            router.push('/login');  // Redireciona para a página de login após o cadastro
        }, 1000);
    };

    return (
        <div className="container mx-auto p-5 max-w-sm">
            <h1 className="text-2xl font-bold mb-4">Cadastro</h1>
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

                <div className="mb-4">
                    <label htmlFor="confirmPassword" className="block text-gray-700">Confirmar Senha</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded"
                >
                    Cadastrar
                </button>
            </form>

            <p className="mt-4 text-center">
    Já tem uma conta? <Link href="/login"><a className="text-blue-500">Faça login</a></Link>
</p>
        </div>
    );
};

export default Register;
