import { House } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
    return (
        <main className='flex flex-col items-center justify-center h-[calc(100vh-(--spacing(16)))] gap-4'>
            <h2>404 Not Found</h2>
            <p>Could not find the requested resource</p>
            <Link
                href='/'
                className='bg-secondary text-primary font-semibold flex items-center px-6 py-2 rounded-full'
            >
                Return Home
                <House size={18} className='ml-2' aria-hidden='true' />
            </Link>
        </main>
    );
}
