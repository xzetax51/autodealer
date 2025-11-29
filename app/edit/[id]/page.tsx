'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

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

export default function EditCar() {
    const router = useRouter();
    const params = useParams();
    const carId = params.id as string;

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState<Car | null>(null);

    useEffect(() => {
        fetchCar();
    }, [carId]);

    const fetchCar = async () => {
        try {
            const response = await fetch(`/api/cars`);
            const cars = await response.json();
            const car = cars.find((c: Car) => c.id === parseInt(carId));
            if (car) {
                setFormData(car);
            }
        } catch (error) {
            console.error('Ошибка при загрузке машины:', error);
            alert('Ошибка при загрузке машины');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        if (!formData) return;
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev!,
            [name]: name === 'year' || name === 'price' || name === 'mileage' ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData) return;

        setSaving(true);

        try {
            const response = await fetch(`/api/cars/${carId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('✓ Машина обновлена успешно!');
                router.push('/');
            } else {
                alert('✗ Ошибка при обновлении машины');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('✗ Ошибка при обновлении машины');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-blue-50 flex items-center justify-center">
                <p className="text-gray-600">Загрузка...</p>
            </div>
        );
    }

    if (!formData) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600 mb-4">Машина не найдена</p>
                    <Link href="/" className="text-blue-600 hover:underline">Вернуться на главную</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-blue-50">
            <nav className="bg-white shadow-md border-b border-rose-200">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
                    <Link href="/" className="text-blue-600 font-bold text-lg hover:underline">
                        ← Назад
                    </Link>
                    <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-500">
                        Редактировать {formData.brand} {formData.model}
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
                                value={formData.imageUrl || ''}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-2 rounded bg-white text-gray-900 placeholder-gray-500"
                                placeholder="https://images.unsplash.com/photo-..."
                            />
                            <p className="text-xs text-gray-600 mt-1">
                                💡 Вставьте ссылку на фото
                            </p>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-900 mb-1">Описание</label>
                            <textarea
                                name="description"
                                value={formData.description || ''}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-2 rounded bg-white text-gray-900 placeholder-gray-500"
                                placeholder="Описание машины"
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
                            disabled={saving}
                            className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-lg hover:from-emerald-600 hover:to-teal-600 disabled:opacity-50 font-medium transition"
                        >
                            {saving ? 'Сохранение...' : '✓ Сохранить изменения'}
                        </button>
                        <Link
                            href="/"
                            className="flex-1 bg-gray-400 text-white px-4 py-2 rounded-lg text-center hover:bg-gray-500 font-medium transition"
                        >
                            ✕ Отмена
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
