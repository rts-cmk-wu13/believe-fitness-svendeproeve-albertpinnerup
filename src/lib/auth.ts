import 'server-only';

import { cookies } from 'next/headers';

export async function createAccessToken(username: string, password: string) {
    const response = await fetch(`${process.env.AUTH_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            password,
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch access token');
    }

    const data = await response.json();

    return {
        accessToken: data.token,
        userId: data.userId,
        expiresIn: data.validUntil,
        role: data.role,
    };
}

export async function checkAuthentication() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;
    const userId = cookieStore.get('userId')?.value;

    const response = await fetch(`${process.env.API_URL}/users/${userId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        cache: 'no-store',
    });

    if (!response.ok) {
        return false;
    }

    return true;
}
