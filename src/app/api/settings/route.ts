import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuth } from '@/lib/auth';

export async function GET() {
  try {
    let settings = await prisma.settings.findUnique({ where: { id: 1 } });
    if (!settings) {
      settings = await prisma.settings.create({
        data: {
          id: 1,
          name: 'Bapak Rijal',
          wa: '+62 812-3456-7890',
          email: 'halo@ternakhub.com',
          address: 'Jl. Alam Asri No. 42, Desa Sukamaju, Kecamatan Agrobisnis, Kabupaten Makmur',
        }
      });
    }
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const auth = await verifyAuth(request);
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name, wa, email, address } = await request.json();

    const settings = await prisma.settings.upsert({
      where: { id: 1 },
      update: { name, wa, email, address },
      create: { id: 1, name, wa, email, address },
    });

    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
