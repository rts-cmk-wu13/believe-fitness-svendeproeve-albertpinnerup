import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import '@/app/globals.css';
import Menu from '@/components/Menu';

const poppins = Poppins({
    weight: ['300', '400', '500', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Believe Fitness',
    description: 'Believe Fitness - Train like a pro',
};

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SidebarProvider>
            <Menu />
            {/* <SidebarTrigger /> */}
            <SidebarInset>{children}</SidebarInset>
        </SidebarProvider>
    );
}
