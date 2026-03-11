'use client';
import { TextAlignEnd, X } from 'lucide-react';

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
import { usePathname } from 'next/navigation';

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

export default function MenuClient({ isAuthentictated }: { isAuthentictated: boolean }) {
    const { toggleSidebar, setOpenMobile } = useSidebar();
    const pathName = usePathname();
    const isActive = (href: string) => pathName === href || pathName.includes(`${href}/`);

    const currentPage = navItems.find((item: NavItem) => item.href === pathName);

    const openMenuIconColor = pathName.includes('/dashboard') ? '#fff' : '#9E9E9E';
    return (
        <>
            <div className='absolute w-full px-5 py-6 z-50 flex justify-between'>
                {!isActive('/dashboard') && <h3 className='font-normal'>{currentPage?.label}</h3>}

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

                                const disabled = !isAuthentictated && item.href === '/profile';

                                console.log('should profile be disabled', disabled);

                                if (disabled) return;

                                return (
                                    <SidebarMenuItem key={item.id}>
                                        <SidebarMenuButton
                                            asChild
                                            onClick={() => setOpenMobile(false)}
                                        >
                                            <Link href={item.href}>
                                                <h3
                                                    className={`${active ? 'font-bold' : 'font-normal'}`}
                                                >
                                                    {!isAuthentictated && item.id === 'logout'
                                                        ? 'Log In'
                                                        : item.label}
                                                </h3>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroup>
                </SidebarContent>
                {/* <SidebarFooter /> */}
            </Sidebar>
        </>
    );
}
