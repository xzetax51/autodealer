import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const car = await prisma.car.update({
            where: { id: parseInt(id) },
            data: body,
        });
        return NextResponse.json(car);
    } catch (error) {
        console.error('PUT Error:', error);
        return NextResponse.json({ error: 'Update error' }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.car.delete({
            where: { id: parseInt(id) },
        });
        return NextResponse.json({ message: 'Deleted' });
    } catch (error) {
        console.error('DELETE Error:', error);
        return NextResponse.json({ error: 'Delete error' }, { status: 500 });
    }
}
