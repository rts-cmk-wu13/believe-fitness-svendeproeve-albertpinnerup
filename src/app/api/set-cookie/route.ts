import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const cookieStore = await cookies();

    const data = await req.json();

    console.log('Setting cookie...', data.name, data.value);

    cookieStore.set(data.name, String(data.value));

    return NextResponse.json({ message: 'Cookie set successfully' });
}
