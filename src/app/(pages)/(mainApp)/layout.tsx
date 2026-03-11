import MainLayout from '@/layouts/MainLayout';
import { checkAuthentication } from '@/lib/auth';

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const isAuthenticated = await checkAuthentication();
    return <MainLayout isAuthenticated={isAuthenticated}>{children}</MainLayout>;
}
