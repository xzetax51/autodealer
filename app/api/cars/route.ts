import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const cars = await prisma.car.findMany();
        return NextResponse.json(cars);
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const car = await prisma.car.create({
            data: {
                brand: body.brand || 'Unknown',
                model: body.model || 'Unknown',
                year: body.year || 2024,
                price: body.price || 0,
                mileage: body.mileage || 0,
                color: body.color || 'Unknown',
                description: body.description || '',
                status: body.status || 'available',
            },
        });

        return NextResponse.json(car, { status: 201 });
    } catch (error) {
        console.error('POST Error:', error);
        return NextResponse.json({ error: 'Creation error' }, { status: 500 });
    }
}
