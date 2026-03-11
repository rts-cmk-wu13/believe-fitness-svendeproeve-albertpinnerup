export default function AuthenticationLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className='flex flex-col items-center justify-center gap-4'>
            <div className='w-full flex flex-col gap-4 z-10 mt-11 px-11'>
                <h1 className='text-secondary'>Believe Fitness</h1>
                <h4>Train like a pro</h4>
            </div>

            {children}
        </main>
    );
}
