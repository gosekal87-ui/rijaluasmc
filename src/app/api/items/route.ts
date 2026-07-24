import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const items = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch items' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, price, imageUrl } = body;

    if (!name || price === undefined) {
      return NextResponse.json({ error: 'Name and price are required' }, { status: 400 });
    }

    const item = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        imageUrl
      }
    });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error('POST /api/items error:', error);
    const message = error instanceof Error ? error.message : 'Failed to create item';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
