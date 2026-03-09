import type { Metadata } from 'next';
import { Geist, Geist_Mono, Poppins } from 'next/font/google';
import './globals.css';
import { ToastContainer } from 'react-toastify';

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
            <body className={`${poppins.className} antialiased`}>
                {children}
                <ToastContainer />
            </body>
        </html>
    );
}
