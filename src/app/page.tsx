import SplashScreen from '@/components/SplashScreen';
import Image from 'next/image';

export default function Home() {
    return (
        <div className='flex min-h-screen items-center justify-center'>
            <main className='flex min-h-screen w-full max-w-3xl flex-col items-center justify-between  sm:items-start'>
                <SplashScreen />
            </main>
        </div>
    );
}
