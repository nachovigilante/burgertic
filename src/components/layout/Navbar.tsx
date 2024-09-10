'use client';

import useAuth from '~/hooks/useAuth';
import NavLink from './NavLink';

const Navbar = () => {
    const { user } = useAuth();

    return (
        <nav>
            <ul className="flex item-center gap-2.5">
                <li>
                    <NavLink path="/" text="Home" />
                </li>
                <li>
                    <NavLink path="/menu" text="Menu" />
                </li>
                {user.id === -1 ? (
                    <li>
                        <NavLink path="/auth/login" text="Log in" />
                    </li>
                ) : (
                    <>
                        <li>
                            <NavLink path="/pedidos" text="Pedidos" />
                        </li>
                    </>
                )}
                {user.admin && (
                    <li>
                        <NavLink path="/admin" text="Admin" />
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
