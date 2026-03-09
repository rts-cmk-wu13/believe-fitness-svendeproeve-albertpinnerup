'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SplashScreen() {
    const router = useRouter();
    const randomizer = Math.floor(Math.random() * 2);
    console.log(randomizer);
    const [hasVisited, _setHasVisited] = useState(() => {
        if (sessionStorage.getItem('hasVisited')) {
            return true;
        } else {
            return false;
        }
    });

    const imgUrl = randomizer ? '/splash1.jpg' : '/splash2.png';

    useEffect(() => {
        if (!hasVisited) {
            sessionStorage.setItem('hasVisited', `${hasVisited}`);
        } else {
            router.push('/dashboard');
        }
    }, []);

    return (
        <section className='relative z-10 p-6 pb-12 flex min-h-svh w-full flex-col items-center justify-between gap-6 overflow-hidden font-sans'>
            <Image
                src={imgUrl}
                alt='Hero Image'
                fill={true}
                className='-z-10 object-cover'
                priority
            />

            <div className='w-full flex flex-col mt-auto mb-4 gap-4 z-10'>
                <h1 className='font-bold text-secondary text-6xl'>Believe Fitness</h1>
                <h2 className='text-background text-xl'>Train like a pro</h2>
            </div>
            <Link href='/dashboard' className='z-10'>
                <Button className='z-10 mt-auto'>START TRAINING</Button>
            </Link>
        </section>
    );
}
