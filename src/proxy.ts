import { NextRequest, NextResponse } from 'next/server';

export async function proxy(request: NextRequest) {
    const url = request.nextUrl.clone();

    url.pathname = '/dashboard';

    const hasVisited = request.cookies.get('hasVisited')?.value;

    const response = NextResponse.next();

    if (!hasVisited) {
        response.cookies.set('hasVisited', 'true', {
            path: '/',
            sameSite: 'lax',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
        });
    } else if (hasVisited === 'true') {
        return NextResponse.redirect(url);
    }

    return response;
}

export const config = {
    matcher: ['/'],
};
