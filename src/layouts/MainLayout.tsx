'use client';

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import '@/app/globals.css';
import Menu from '@/components/Menu';
import { usePathname } from 'next/navigation';

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathName = usePathname();
    const isActive = (href: string) => pathName === href || pathName.includes(`${href}/`);
    return (
        <SidebarProvider defaultOpen={false}>
            <Menu />
            {/* <SidebarTrigger /> */}
            <SidebarInset className={isActive('/dashboard') ? 'mt-0' : 'mt-[76px]'}>
                {children}
            </SidebarInset>
        </SidebarProvider>
    );
}
