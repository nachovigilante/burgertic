'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

const NavLink = ({ path, text }: { path: string; text: string }) => {
    const pathname = usePathname();

    return (
        <Link
            className={twMerge(
                'no-underline text-black font-semibold text-[15px] px-4 py-2.5 rounded-[20px] transition-all duration-300 ease-in-out hover:bg-[#dedede]',
                pathname === path &&
                    'bg-[#d72300] hover:bg-[#d72300] text-white',
            )}
            href={path}
        >
            {text}
        </Link>
    );
};

export default NavLink;
