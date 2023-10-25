'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

const NavLink = ({ path, text }: { path: string; text: string }) => {
    const pathname = usePathname();

    return (
        <Link
            className={twMerge(pathname === path && 'highlighted')}
            href={path}
        >
            {text}
        </Link>
    );
};

export default NavLink;
