import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import '@/app/globals.css';

const poppins = Poppins({
    weight: ['300', '400', '500', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Believe Fitness',
    description: 'Believe Fitness - Train like a pro',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body className={`${poppins.className} antialiased relative`}>
                {children}
                <ToastContainer />
            </body>
        </html>
    );
}
