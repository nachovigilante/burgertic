'use client';

import User from '../User';
import Navbar from './Navbar';

const Header = () => {
    return (
        <header>
            <div className="container">
                <a className="logo" href="./">
                    <img src="./assets/logo.svg" alt="" />
                </a>
                <div className="flex items-center">
                    <Navbar />
                    <User />
                </div>
            </div>
        </header>
    );
};

export default Header;
