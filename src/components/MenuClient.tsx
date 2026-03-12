'use client';
import { ArrowLeft, ChevronLeft, TextAlignEnd, X } from 'lucide-react';

import {
    SidebarContent,
    SidebarGroup,
    Sidebar,
    useSidebar,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from './ui/sidebar';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { logInAction, logOutAction } from '@/lib/actions/authActions';
import { useActionState, useTransition, useState } from 'react';
import { createPortal } from 'react-dom';

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
    const { toggleSidebar, setOpenMobile } = useSidebar();
    const pathName = usePathname();
    const router = useRouter();
    const pathNameArr = pathName.split('/');
    const isActive = (href: string) => pathName === href || pathName.includes(`${href}/`);
    const [_, startTransition] = useTransition();
    const [showModal, setShowModal] = useState(false);

    const currentPage = navItems.find((item: NavItem) => item.href === pathName);

    const openMenuIconColor =
        pathName.includes('/dashboard') || pathName.startsWith('/classes/') ? '#fff' : '#9E9E9E';

    const pagesWithBackButton =
        pathName.includes('/search') || pathName.includes('profile') || pathNameArr.length > 2;
    return (
        <>
            <div className='absolute w-full px-5 py-6 z-50 flex justify-between'>
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
                <button onClick={toggleSidebar} className='ml-auto'>
                    <TextAlignEnd color={openMenuIconColor} />
                </button>
            </div>

            <Sidebar collapsible='offcanvas' variant='inset' side='right'>
                {/* <SidebarHeader /> */}
                <button className='absolute z-50 right-5 top-6' onClick={toggleSidebar}>
                    <X color='#9E9E9E' />
                </button>
                <SidebarContent className='mt-52'>
                    <SidebarGroup>
                        <SidebarMenu className='items-center gap-6'>
                            {navItems.map((item: NavItem) => {
                                const active = isActive(item.href);

                                const disabled = !isAuthenticated && item.href === '/profile';

                                if (disabled) return;

                                return (
                                    <SidebarMenuItem key={item.id}>
                                        <SidebarMenuButton className='text-2xl' asChild>
                                            {!isAuthenticated ? (
                                                <Link
                                                    href={item.href}
                                                    onClick={() => setOpenMobile(false)}
                                                >
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
                                                        setOpenMobile(false);
                                                        setShowModal(true);
                                                    }}
                                                >
                                                    <h3
                                                        className={`${active ? 'font-bold' : 'font-normal'}`}
                                                    >
                                                        Log out
                                                    </h3>
                                                </button>
                                            ) : (
                                                <Link
                                                    href={item.href}
                                                    onClick={() => setOpenMobile(false)}
                                                >
                                                    <h3
                                                        className={`${active ? 'font-bold' : 'font-normal'} text-2xl`}
                                                    >
                                                        {item.label}
                                                    </h3>
                                                </Link>
                                            )}
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroup>
                    <SidebarGroup></SidebarGroup>
                </SidebarContent>
                {/* <SidebarFooter /> */}
            </Sidebar>
            {showModal &&
                createPortal(
                    <div
                        className='h-screen w-screen fixed top-0 left-0 bg-black/50 flex items-center justify-center z-1000'
                        onClick={() => setShowModal(false)}
                    >
                        <div
                            className='bg-background p-6 m-5 rounded-lg flex flex-col items-center gap-4 z-1000'
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h4 className='text-primary font-medium'>
                                Are you sure you want to log out?
                            </h4>
                            <div className='flex gap-4'>
                                <Button
                                    variant='outline'
                                    className='text-primary'
                                    onClick={() => setShowModal(false)}
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
