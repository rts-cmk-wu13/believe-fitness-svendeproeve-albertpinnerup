import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';
import splash1 from '../../public/splash1.jpg';
import splash2 from '../../public/splash2.png';

export default function SplashScreen() {
    const randomizer = Math.floor(Math.random() * 2);

    // const imgUrl = randomizer ? '/splash1.jpg' : '/splash2.png';
    const imgUrl = randomizer ? splash1 : splash2;

    return (
        <section className='relative z-10 p-6 pb-12 flex min-h-svh w-full flex-col items-center justify-between gap-6 overflow-hidden font-sans'>
            <Image
                src={imgUrl}
                alt='Hero Image'
                fill={true}
                className='-z-10 object-cover'
                priority
                unoptimized
            />

            <div className='w-full flex flex-col mt-auto mb-4 gap-4 z-10'>
                <h1 className='font-bold text-secondary text-6xl'>Believe Fitness</h1>
                <h2 className='text-background text-xl'>Train like a pro</h2>
            </div>
            <Link href='/dashboard' className='z-10 '>
                <Button className='z-10 mt-auto  animate-in fill-mode-both fade-in delay-700 slide-in-from-left duration-700'>
                    START TRAINING
                </Button>
            </Link>
        </section>
    );
}
