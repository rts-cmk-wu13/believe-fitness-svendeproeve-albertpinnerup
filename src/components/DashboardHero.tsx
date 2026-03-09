import Image from 'next/image';
import heroImage from '../../public/welcome.jpg';
import Link from 'next/link';
import { Button } from './ui/button';
import { fetchUtil } from '@/lib/utils';

export default async function DashboardHero() {
    const articles = await fetchUtil('news');

    console.log(articles);
    return (
        <section>
            <div className='relative aspect-410/324'>
                {/* container */}
                <div className='w-full h-full p-5 bg-black/40 z-20 relative flex flex-col gap-6'>
                    <h2 className='text-secondary font-bold mt-auto'>Welcome to Believe Fitness</h2>
                    <div className='flex gap-2'>
                        <Link href='/classes'>
                            <Button>CLASSES</Button>
                        </Link>
                        <Link href='/login'>
                            <Button>CLASSES</Button>
                        </Link>
                    </div>
                </div>
                <Image src={heroImage} alt='hero image' fill objectFit='cover' preload />
            </div>
        </section>
    );
}
