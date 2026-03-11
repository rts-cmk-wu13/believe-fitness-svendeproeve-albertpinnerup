import AuthenticationLayout from '@/layouts/AuthenticationLayout';

export default function AuthPagesLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <AuthenticationLayout>{children}</AuthenticationLayout>;
}
