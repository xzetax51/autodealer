'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast, ToastContainer } from './components/Toast';
import Image from 'next/image';

interface Car {
    id: number;
    brand: string;
    model: string;
    year: number;
    price: number;
    mileage: number;
    color: string;
    status: string;
    description?: string;
    imageUrl?: string;
}

export default function Home() {
    const router = useRouter();
    const { toasts, showToast } = useToast();

    const [cars, setCars] = useState<Car[]>([]);
    const [filteredCars, setFilteredCars] = useState<Car[]>([]);
    const [loading, setLoading] = useState(true);
    const [brand, setBrand] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [status, setStatus] = useState('');
    const [userRole, setUserRole] = useState<string | null>(null);
    const [username, setUsername] = useState('');
    const [darkMode, setDarkMode] = useState(false);
    const [sortBy, setSortBy] = useState<'none' | 'price-asc' | 'price-desc' | 'year-desc' | 'mileage-asc'>('none');

    useEffect(() => {
        const role = localStorage.getItem('userRole');
        const user = localStorage.getItem('username');
        const savedDarkMode = localStorage.getItem('darkMode') === 'true';

        if (!role) {
            router.push('/login');
            return;
        }

        setUserRole(role);
        setUsername(user || '');
        setDarkMode(savedDarkMode);
        fetchCars();
    }, [router]);

    const fetchCars = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/cars');
            const data = await response.json();
            setCars(data);
            setFilteredCars(data);
        } catch (error) {
            console.error('Ошибка при загрузке машин:', error);
            showToast('Ошибка при загрузке машин', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleFilter = () => {
        let filtered = cars;

        if (brand) {
            filtered = filtered.filter(car =>
                car.brand.toLowerCase().includes(brand.toLowerCase())
            );
        }

        if (maxPrice) {
            filtered = filtered.filter(car => car.price <= parseFloat(maxPrice));
        }

        if (status) {
            filtered = filtered.filter(car => car.status === status);
        }

        applySort(filtered);
        showToast(`Найдено ${filtered.length} машин`, 'info');
    };

    const applySort = (carsToSort: Car[]) => {
        let sorted = [...carsToSort];

        switch (sortBy) {
            case 'price-asc':
                sorted.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                sorted.sort((a, b) => b.price - a.price);
                break;
            case 'year-desc':
                sorted.sort((a, b) => b.year - a.year);
                break;
            case 'mileage-asc':
                sorted.sort((a, b) => a.mileage - b.mileage);
                break;
            default:
                break;
        }

        setFilteredCars(sorted);
    };

    const handleReset = () => {
        setBrand('');
        setMaxPrice('');
        setStatus('');
        setSortBy('none');
        setFilteredCars(cars);
        showToast('Фильтры сброшены', 'info');
    };

    const handleDelete = async (id: number) => {
        if (confirm('Вы уверены, что хотите удалить эту машину?')) {
            try {
                await fetch(`/api/cars/${id}`, { method: 'DELETE' });
                setCars(cars.filter(car => car.id !== id));
                setFilteredCars(filteredCars.filter(car => car.id !== id));
                showToast('✓ Машина удалена успешно!', 'success');
            } catch (error) {
                console.error('Ошибка при удалении:', error);
                showToast('✗ Ошибка при удалении', 'error');
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('userRole');
        localStorage.removeItem('username');
        showToast('Вы вышли из системы', 'info');
        router.push('/login');
    };

    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        localStorage.setItem('darkMode', newDarkMode.toString());
        showToast(newDarkMode ? '🌙 Темная тема' : '☀️ Светлая тема', 'info');
    };

    if (!userRole) {
        return null;
    }

    const isAdmin = userRole === 'admin';
    const bgClass = darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-rose-50 via-purple-50 to-blue-50';
    const cardClass = darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-rose-100';
    const navClass = darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-rose-200';
    const inputClass = darkMode
        ? 'bg-gray-700 text-white border-gray-600 placeholder-gray-400'
        : 'bg-rose-50 text-gray-900 border-rose-200 placeholder-gray-500';

    return (
        <div className={`min-h-screen ${bgClass}`}>
            <ToastContainer toasts={toasts} />

            <nav className={`${navClass} shadow-md border-b`}>
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-500">
                        🚗 AutoDealer
                    </h1>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleDarkMode}
                            className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
                            title="Переключить тему"
                        >
                            {darkMode ? '☀️' : '🌙'}
                        </button>
                        <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                            {isAdmin ? '👨‍💼' : '👤'} {username}
                        </span>
                        {isAdmin && (
                            <Link
                                href="/add"
                                className="bg-gradient-to-r from-rose-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:from-rose-600 hover:to-purple-600 transition"
                            >
                                + Добавить машину
                            </Link>
                        )}
                        <button
                            onClick={handleLogout}
                            className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
                        >
                            Выход
                        </button>
                    </div>
                </div>
            </nav>

            <div className={`${navClass} border-b shadow-sm p-4`}>
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <input
                            type="text"
                            placeholder="Марка..."
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                            className={`border p-2 rounded ${inputClass}`}
                        />
                        <input
                            type="number"
                            placeholder="Макс. цена..."
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            className={`border p-2 rounded ${inputClass}`}
                        />
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className={`border p-2 rounded ${inputClass}`}
                        >
                            <option value="">Все статусы</option>
                            <option value="available">Доступна</option>
                            <option value="sold">Продана</option>
                            <option value="reserved">Зарезервирована</option>
                        </select>
                        <select
                            value={sortBy}
                            onChange={(e) => {
                                setSortBy(e.target.value as any);
                                applySort(filteredCars);
                            }}
                            className={`border p-2 rounded ${inputClass}`}
                        >
                            <option value="none">Сортировка</option>
                            <option value="price-asc">💰 Цена: возрастание</option>
                            <option value="price-desc">💰 Цена: убывание</option>
                            <option value="year-desc">📅 Год: новые</option>
                            <option value="mileage-asc">🛣️ Пробег: минимум</option>
                        </select>
                        <div className="flex gap-2">
                            <button
                                onClick={handleFilter}
                                className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded hover:from-emerald-600 hover:to-teal-600 font-medium transition"
                            >
                                Фильтр
                            </button>
                            <button
                                onClick={handleReset}
                                className={`flex-1 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-400 hover:bg-gray-500'} text-white px-4 py-2 rounded font-medium transition`}
                            >
                                Сброс
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto p-4">
                <h2 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Каталог автомобилей
                </h2>

                {loading ? (
                    <div className="text-center py-10">
                        <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Загрузка...</p>
                    </div>
                ) : filteredCars.length === 0 ? (
                    <div className="text-center py-10">
                        <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Машины не найдены</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCars.map((car) => (
                            <div
                                key={car.id}
                                className={`${cardClass} rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 border`}
                            >
                                {/* Фото машины */}
                                <div className="relative h-48 bg-gray-300 overflow-hidden">
                                    <img
                                        src={car.imageUrl || 'https://via.placeholder.com/400x300?text=Car+Image'}
                                        alt={`${car.brand} ${car.model}`}
                                        className="w-full h-full object-cover hover:scale-110 transition duration-300"
                                    />
                                    <div className="absolute top-2 right-2">
                                        <span
                                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${car.status === 'available'
                                                    ? 'bg-emerald-500 text-white'
                                                    : car.status === 'sold'
                                                        ? 'bg-rose-500 text-white'
                                                        : 'bg-yellow-500 text-white'
                                                }`}
                                        >
                                            {car.status === 'available'
                                                ? '✓ Доступна'
                                                : car.status === 'sold'
                                                    ? '✗ Продана'
                                                    : '⚠ Зарезервирована'}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-4">
                                    <h3 className={`text-xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                        {car.brand} {car.model}
                                    </h3>
                                    <p className={`text-sm mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        {car.year} | {car.color}
                                    </p>

                                    <div className="grid grid-cols-2 gap-3 mb-3 pb-3 border-b border-opacity-20">
                                        <div>
                                            <p className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                                Цена
                                            </p>
                                            <p className="text-lg font-bold text-emerald-600">
                                                ₽{car.price.toLocaleString()}
                                            </p>
                                        </div>
                                        <div>
                                            <p className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                                Пробег
                                            </p>
                                            <p className={`text-lg font-bold ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                                                {car.mileage.toLocaleString()} км
                                            </p>
                                        </div>
                                    </div>

                                    {car.description && (
                                        <p className={`text-sm mb-4 line-clamp-2 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                                            {car.description}
                                        </p>
                                    )}

                                    <div className="flex gap-2">
                                        {isAdmin ? (
                                            <div className="flex gap-2">
                                                <Link
                                                    href={`/edit/${car.id}`}
                                                    className="flex-1 bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition font-medium text-center"
                                                >
                                                    ✏️ Изменить
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(car.id)}
                                                    className="flex-1 bg-rose-500 text-white px-3 py-2 rounded-lg hover:bg-rose-600 transition font-medium"
                                                >
                                                    🗑 Удалить
                                                </button>
                                            </div>
                                        ) : (

                                            <button className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-2 rounded-lg hover:from-emerald-600 hover:to-teal-600 transition font-medium">
                                                💳 Купить
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="max-w-7xl mx-auto p-4 mt-8">
                <div className={`${cardClass} rounded-xl shadow-md p-6 border`}>
                    <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        📊 Статистика каталога
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div>
                            <p className={`font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                Всего машин
                            </p>
                            <p className="text-3xl font-bold text-rose-500">{cars.length}</p>
                        </div>
                        <div>
                            <p className={`font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                Доступно
                            </p>
                            <p className="text-3xl font-bold text-emerald-600">
                                {cars.filter(c => c.status === 'available').length}
                            </p>
                        </div>
                        <div>
                            <p className={`font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                Продано
                            </p>
                            <p className="text-3xl font-bold text-rose-600">
                                {cars.filter(c => c.status === 'sold').length}
                            </p>
                        </div>
                        <div>
                            <p className={`font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                Средняя цена
                            </p>
                            <p className="text-3xl font-bold text-purple-600">
                                {cars.length > 0
                                    ? '₽' + Math.round(
                                        cars.reduce((sum, car) => sum + car.price, 0) / cars.length
                                    ).toLocaleString()
                                    : '₽0'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <footer className={`${darkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-rose-900 to-purple-900'} text-white p-6 mt-12 text-center`}>
                <p>© 2025 AutoDealer. Курсовая работа. Литвинович Кирилл СП291 | Next.js + PostgreSQL + Prisma</p>
            </footer>
        </div>
    );
}