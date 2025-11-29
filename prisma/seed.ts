import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Очищаем БД...');

    // Удаляем все данные
    await prisma.sale.deleteMany({});
    await prisma.car.deleteMany({});
    await prisma.client.deleteMany({});

    console.log('Добавляем тестовые данные по автомобилям...');

    await prisma.car.createMany({
        data: [
            {
                brand: 'Toyota',
                model: 'Camry',
                year: 2023,
                price: 2500000,
                mileage: 15000,
                color: 'Белый',
                status: 'available',
                description: 'Отличное состояние',
                imageUrl: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=500&h=400'
            },
            {
                brand: 'BMW',
                model: 'X5',
                year: 2022,
                price: 5000000,
                mileage: 25000,
                color: 'Чёрный',
                status: 'available',
                description: 'Премиум класс',
                imageUrl: 'https://images.unsplash.com/photo-1556821552-5f63b1016170?w=500&h=400'
            },
            {
                brand: 'Mercedes-Benz',
                model: 'E-Class',
                year: 2023,
                price: 4500000,
                mileage: 10000,
                color: 'Серебристый',
                status: 'available',
                imageUrl: 'https://images.unsplash.com/photo-1611818913239-14602d56c0ba?w=500&h=400'
            },
            {
                brand: 'Audi',
                model: 'A4',
                year: 2021,
                price: 3200000,
                mileage: 45000,
                color: 'Синий',
                status: 'sold',
                imageUrl: 'https://images.unsplash.com/photo-1606611013016-969c19d14444?w=500&h=400'
            },
            {
                brand: 'Volkswagen',
                model: 'Passat',
                year: 2020,
                price: 2200000,
                mileage: 60000,
                color: 'Красный',
                status: 'available',
                imageUrl: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=500&h=400'
            },
            {
                brand: 'Mazda',
                model: 'CX-5',
                year: 2022,
                price: 2800000,
                mileage: 30000,
                color: 'Оранжевый',
                status: 'reserved',
                imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&h=400'
            },
            {
                brand: 'Honda',
                model: 'Accord',
                year: 2023,
                price: 2600000,
                mileage: 5000,
                color: 'Белый',
                status: 'available',
                imageUrl: 'https://images.unsplash.com/photo-1609687626917-11acb9c3ecc8?w=500&h=400'
            },
            {
                brand: 'Hyundai',
                model: 'Sonata',
                year: 2022,
                price: 2100000,
                mileage: 35000,
                color: 'Зелёный',
                status: 'available',
                imageUrl: 'https://images.unsplash.com/photo-1606407945410-796b0347e7a3?w=500&h=400'
            },
            {
                brand: 'Kia',
                model: 'Optima',
                year: 2021,
                price: 2000000,
                mileage: 50000,
                color: 'Серый',
                status: 'available',
                imageUrl: 'https://images.unsplash.com/photo-1626668712015-fca050dff33b?w=500&h=400'
            },
            {
                brand: 'Nissan',
                model: 'Qashqai',
                year: 2023,
                price: 2400000,
                mileage: 8000,
                color: 'Чёрный',
                status: 'available',
                imageUrl: 'https://images.unsplash.com/photo-1609687626917-11acb9c3ecc8?w=500&h=400'
            },
        ],
    });

    console.log('✅ База данных успешно заполнена примерами!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
