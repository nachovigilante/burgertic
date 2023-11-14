'use client';

import useAuth from '~/hooks/useAuth';
import NavLink from './NavLink';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav>
            <ul className="flex item-center">
                <li>
                    <NavLink path="/" text="Home" />
                </li>
                {user.id === -1 ? (
                    <li>
                        <NavLink path="/auth/login" text="Log in" />
                    </li>
                ) : (
                    <>
                        <li>
                            <NavLink path="/menu" text="Menu" />
                        </li>
                        <li>
                            <NavLink path="/pedidos" text="Pedidos" />
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
