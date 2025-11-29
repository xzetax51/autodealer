'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AddCar() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        brand: '',
        model: '',
        year: new Date().getFullYear(),
        price: '',
        mileage: '',
        color: '',
        status: 'available',
        description: '',
        imageUrl: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'year' || name === 'price' || name === 'mileage' ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('/api/cars', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('✓ Машина добавлена успешно!');
                router.push('/');
            } else {
                alert('✗ Ошибка при добавлении машины');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('✗ Ошибка при добавлении машины');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-blue-50">
            <nav className="bg-white shadow-md border-b border-rose-200">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
                    <Link href="/" className="text-blue-600 font-bold text-lg hover:underline">
                        ← Назад
                    </Link>
                    <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-500">
                        Добавить машину
                    </h1>
                </div>
            </nav>

            <div className="max-w-2xl mx-auto p-4 mt-8">
                <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 border border-rose-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-1">Марка *</label>
                            <input
                                type="text"
                                name="brand"
                                value={formData.brand}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 p-2 rounded bg-white text-gray-900 placeholder-gray-500"
                                placeholder="Toyota"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-1">Модель *</label>
                            <input
                                type="text"
                                name="model"
                                value={formData.model}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 p-2 rounded bg-white text-gray-900 placeholder-gray-500"
                                placeholder="Camry"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-1">Год *</label>
                            <input
                                type="number"
                                name="year"
                                value={formData.year}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 p-2 rounded bg-white text-gray-900"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-1">Цена (₽) *</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 p-2 rounded bg-white text-gray-900 placeholder-gray-500"
                                placeholder="2500000"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-1">Пробег (км) *</label>
                            <input
                                type="number"
                                name="mileage"
                                value={formData.mileage}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 p-2 rounded bg-white text-gray-900 placeholder-gray-500"
                                placeholder="15000"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-1">Цвет</label>
                            <input
                                type="text"
                                name="color"
                                value={formData.color}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-2 rounded bg-white text-gray-900 placeholder-gray-500"
                                placeholder="Белый"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-1">Статус</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-2 rounded bg-white text-gray-900"
                            >
                                <option value="available">Доступна</option>
                                <option value="sold">Продана</option>
                                <option value="reserved">Зарезервирована</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-1">URL фото 📸</label>
                            <input
                                type="url"
                                name="imageUrl"
                                value={formData.imageUrl}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-2 rounded bg-white text-gray-900 placeholder-gray-500"
                                placeholder="https://images.unsplash.com/photo-..."
                            />
                            <p className="text-xs text-gray-600 mt-1">
                                💡 Используйте ссылку на фото (например, из Unsplash)
                            </p>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-900 mb-1">Описание</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-2 rounded bg-white text-gray-900 placeholder-gray-500"
                                placeholder="Отличное состояние, полный сервис"
                                rows={3}
                            />
                        </div>
                    </div>

                    {/* Превью фото */}
                    {formData.imageUrl && (
                        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm font-medium text-gray-900 mb-2">Превью фото:</p>
                            <img
                                src={formData.imageUrl}
                                alt="Preview"
                                className="w-full max-w-xs h-48 object-cover rounded-lg"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Ошибка+загрузки';
                                }}
                            />
                        </div>
                    )}

                    <div className="flex gap-2 mt-6">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 bg-gradient-to-r from-rose-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:from-rose-600 hover:to-purple-600 disabled:opacity-50 font-medium transition"
                        >
                            {loading ? 'Сохранение...' : '✓ Добавить машину'}
                        </button>
                        <Link
                            href="/"
                            className="flex-1 bg-gray-400 text-white px-4 py-2 rounded-lg text-center hover:bg-gray-500 font-medium transition"
                        >
                            ✕ Отмена
                        </Link>
                    </div>
                </form>

                <div className="mt-6 bg-white rounded-lg shadow-md p-4 border border-blue-200">
                    <p className="text-sm font-medium text-gray-900 mb-2">📎 Где получить URL фото?</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                        <li>🔗 <a href="https://unsplash.com" target="_blank" className="text-blue-600 hover:underline">Unsplash.com</a> — бесплатные фото машин</li>
                        <li>🔗 <a href="https://pexels.com" target="_blank" className="text-blue-600 hover:underline">Pexels.com</a> — ещё фото</li>
                        <li>🔗 Или загрузите фото в облако (Google Drive, Яндекс.Диск) и поделитесь ссылкой</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
