'use client';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import '@/app/globals.css';
import { usePathname } from 'next/navigation';
import MenuClient from '@/components/MenuClient';

export default function MainLayout({
    children,
    isAuthenticated,
}: Readonly<{
    children: React.ReactNode;
    isAuthenticated: boolean;
}>) {
    const pathName = usePathname();
    const isActive = (href: string) =>
        pathName === href || pathName.includes(`${href}/`) || pathName.startsWith('/classes/');
    return (
        <>
            <SidebarProvider defaultOpen={false}>
                <MenuClient isAuthenticated={isAuthenticated} />
                {/* <SidebarTrigger /> */}
                <SidebarInset className={isActive('/dashboard') ? 'mt-0' : 'mt-[76px]'}>
                    {children}
                </SidebarInset>
            </SidebarProvider>
            {pathName.includes('/dashboard') && (
                <footer className='mb-8'>
                    <section className='flex flex-col items-center gap-2'>
                        <h2 className='text-secondary'>Believe Fitness</h2>
                        <h4>Train like a pro</h4>
                        <address className='not-italic'>Rabalderstræde 48 . 4000 Roskilde</address>
                        <a href='mailto:hello@believe-fitness.com'>hello@believe-fitness.com</a>
                    </section>
                </footer>
            )}
        </>
    );
}
