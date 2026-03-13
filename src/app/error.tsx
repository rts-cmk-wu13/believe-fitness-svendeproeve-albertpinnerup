'use client'; // Error boundaries must be Client Components

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    console.log(error);

    return (
        <section className='p-4 flex flex-col my-auto gap-8 h-screen overflow-hidden justify-center'>
            <section>
                <h2 className='text-secondary'>{error.message}</h2>
                <h2>Something went wrong!</h2>
            </section>
            <div className='flex flex-col items-center gap-5'>
                <Button
                    onClick={
                        // Attempt to recover by trying to re-render the segment
                        () => reset()
                    }
                >
                    Please try again
                </Button>
                <h5 className='text-center'>or</h5>
                <Link href={'/'}>
                    <Button>Return Home</Button>
                </Link>
            </div>
        </section>
    );
}
