import MainLayout from '@/layouts/MainLayout';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <MainLayout>{children}</MainLayout>;
}
