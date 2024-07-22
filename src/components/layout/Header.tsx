'use client';

import Link from 'next/link';
import User from '../User';
import Navbar from './Navbar';

const Header = () => {
    return (
        <header className="flex justify-center w-screen shadow-large">
            <div className="container flex justify-between items-center py-4 px-0">
                <Link href="/">
                    <img
                        className="h-[55px] cursor-pointer transition-all duration-200 ease-in-out hover:scale-105"
                        src="/assets/logo.svg"
                        alt="Logo Burgertic"
                    />
                </Link>
                <div className="flex items-center">
                    <Navbar />
                    <User />
                </div>
            </div>
        </header>
    );
};

export default Header;
