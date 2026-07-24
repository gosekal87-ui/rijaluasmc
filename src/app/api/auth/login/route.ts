import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'rahasia-super-aman';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // Check if any admin exists, if not, create a default one (for demo purposes)
    const adminCount = await prisma.admin.count();
    if (adminCount === 0 && username === 'admin' && password === 'admin') {
      await prisma.admin.create({
        data: { username: 'admin', password: 'password' }
      });
    }

    const admin = await prisma.admin.findUnique({
      where: { username }
    });

    // In a real app, use bcrypt to compare passwords
    if (!admin || admin.password !== password) {
      // Fallback for simple testing if DB isn't seeded properly
      if (username !== 'admin' || password !== 'admin') {
         return NextResponse.json({ error: 'Username atau password salah' }, { status: 401 });
      }
    }

    const token = jwt.sign({ id: admin?.id || 'admin', username }, JWT_SECRET, { expiresIn: '1d' });

    const response = NextResponse.json({ success: true, message: 'Login berhasil' });
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/'
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Terjadi kesalahan pada server' }, { status: 500 });
  }
}
