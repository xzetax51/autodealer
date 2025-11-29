'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Простая аутентификация
        if (username === 'admin' && password === 'admin123') {
            localStorage.setItem('userRole', 'admin');
            localStorage.setItem('username', 'admin');
            router.push('/');
        } else if (username === 'buyer' && password === 'buyer123') {
            localStorage.setItem('userRole', 'customer');
            localStorage.setItem('username', 'buyer');
            router.push('/');
        } else {
            setError('Неправильный логин или пароль');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-blue-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-500 mb-2">
                            🚗 AutoDealer
                        </h1>
                        <p className="text-gray-600">Вход в систему</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Логин
                            </label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="w-full px-4 py-2 border border-rose-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 bg-rose-50 text-gray-900"
                                placeholder="admin или buyer"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Пароль
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-2 border border-rose-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 bg-rose-50 text-gray-900"
                                placeholder="admin123 или buyer123"
                            />
                        </div>

                        {error && (
                            <div className="p-3 bg-red-100 text-red-800 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-rose-500 to-purple-500 text-white font-medium py-2 rounded-lg hover:from-rose-600 hover:to-purple-600 transition disabled:opacity-50"
                        >
                            {loading ? 'Вход...' : 'Войти'}
                        </button>
                    </form>

                    <div className="mt-6 p-4 bg-blue-50 rounded-lg text-sm text-gray-700">
                        <p className="font-medium mb-2">Тестовые учетные данные:</p>
                        <p>👨‍💼 Админ: <code className="bg-white px-2 py-1 rounded">admin</code> / <code className="bg-white px-2 py-1 rounded">admin123</code></p>
                        <p>👤 Покупатель: <code className="bg-white px-2 py-1 rounded">buyer</code> / <code className="bg-white px-2 py-1 rounded">buyer123</code></p>
                    </div>
                </div>

                <div className="text-center mt-6 text-gray-600 text-sm">
                    <p>© 2025 AutoDealer. Курсовая работа. Литвинович Кирилл СП291</p>
                </div>
            </div>
        </div>
    );
}
