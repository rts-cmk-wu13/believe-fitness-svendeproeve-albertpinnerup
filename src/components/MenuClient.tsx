'use client';
import { ArrowLeft, TextAlignEnd, X } from 'lucide-react';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { logOutAction } from '@/lib/actions/authActions';
import { useTransition, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Sheet, SheetContent, SheetTitle } from './ui/sheet';

type NavItem = {
    id: string;
    label: string;
    href: string;
};

const navItems: NavItem[] = [
    { id: 'home', label: 'Home', href: '/dashboard' },
    { id: 'classes', label: 'Popular Classes', href: '/classes' },
    { id: 'seach', label: 'Search', href: '/search' },
    { id: 'profile', label: 'My Profile', href: '/profile' },
    { id: 'logout', label: 'Log Out', href: '/login' },
];

export default function MenuClient({ isAuthenticated }: { isAuthenticated: boolean }) {
    const pathName = usePathname();
    const router = useRouter();
    const pathNameArr = pathName.split('/');
    const isActive = (href: string) => pathName === href || pathName.includes(`${href}/`);
    const [_, startTransition] = useTransition();
    const [showModal, setShowModal] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(false);
    }, [pathName]);

    const currentPage = navItems.find((item: NavItem) => item.href === pathName);

    const openMenuIconColor =
        pathName.includes('/dashboard') || pathName.startsWith('/classes/') ? '#fff' : '#9E9E9E';

    const pagesWithBackButton =
        pathName.includes('/search') ||
        pathName.includes('profile') ||
        pathName.includes('/classes') ||
        pathNameArr.length > 2;
    return (
        <>
            <header className='absolute w-full top-0 px-5 py-6 z-50 flex justify-between'>
                {!isActive('/dashboard') && (
                    <div className='flex items-center gap-2'>
                        {pagesWithBackButton && (
                            <ArrowLeft
                                size={24}
                                onClick={() => router.back()}
                                className='z-20  relative'
                                color={openMenuIconColor}
                            />
                        )}
                        <h3 className='font-normal'>{currentPage?.label}</h3>
                    </div>
                )}
                <button onClick={() => setOpen(true)} className='ml-auto'>
                    <TextAlignEnd color={openMenuIconColor} />
                </button>
            </header>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTitle className='sr-only'>Menu</SheetTitle>
                <SheetContent showCloseButton={false} side='right' forceMount={true}>
                    <button className='absolute z-50 right-5 top-6' onClick={() => setOpen(false)}>
                        <X color='#9E9E9E' />
                    </button>
                    <div className='mt-52'>
                        <nav>
                            <ul className='flex flex-col gap-6 items-center text-2xl'>
                                {navItems.map((item: NavItem) => {
                                    const active = isActive(item.href);

                                    const disabled = !isAuthenticated && item.href === '/profile';

                                    if (disabled) return;

                                    return (
                                        <li key={item.id} className='text-2xl'>
                                            {!isAuthenticated ? (
                                                <Link href={item.href} className='text-2xl'>
                                                    <h3
                                                        className={`${active ? 'font-bold' : 'font-normal'}`}
                                                    >
                                                        {item.id === 'logout'
                                                            ? 'Log In'
                                                            : item.label}
                                                    </h3>
                                                </Link>
                                            ) : item.id === 'logout' ? (
                                                <button
                                                    onClick={() => {
                                                        setOpen(false);
                                                        setShowModal(true);
                                                    }}
                                                >
                                                    <h3
                                                        className={`${active ? 'font-bold' : 'font-normal text-2xl'}`}
                                                    >
                                                        Log out
                                                    </h3>
                                                </button>
                                            ) : (
                                                <Link href={item.href} className='text-2xl'>
                                                    <h3
                                                        className={`${active ? 'font-bold' : 'font-normal'} text-2xl`}
                                                    >
                                                        {item.label}
                                                    </h3>
                                                </Link>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>
                    </div>
                </SheetContent>
            </Sheet>
            {showModal &&
                createPortal(
                    <div
                        className='h-screen w-screen fixed top-0 left-0 bg-black/50 flex items-center justify-center z-1000'
                        onClick={() => setShowModal(false)}
                    >
                        <div className='bg-background p-6 m-5 rounded-lg flex flex-col items-center gap-4 z-1000'>
                            <h4 className='text-primary font-medium'>
                                Are you sure you want to log out?
                            </h4>
                            <div className='flex gap-4'>
                                <Button
                                    variant='outline'
                                    className='text-primary'
                                    onClick={() => {
                                        setShowModal(false);
                                    }}
                                >
                                    CANCEL
                                </Button>
                                <Button
                                    variant='destructive'
                                    onClick={() => startTransition(() => logOutAction())}
                                >
                                    LOG OUT
                                </Button>
                            </div>
                        </div>
                    </div>,
                    document.body
                )}
        </>
    );
}
