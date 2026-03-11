import { NextRequest, NextResponse } from 'next/server';
import { checkAuthentication } from './lib/auth';

export async function proxy(request: NextRequest) {
    if (request.nextUrl.pathname === '/') {
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

    if (request.nextUrl.pathname.startsWith('/profile')) {
        const session = await checkAuthentication();

        if (!session) {
            const res = NextResponse.redirect(new URL('/login', request.url));
            res.cookies.delete('accessToken');
            res.cookies.delete('userId');
            return res;
        }

        return NextResponse.next();
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/profile/:path*'],
};
