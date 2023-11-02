import NavLink from './NavLink';

const Navbar = () => {

    return (
        <nav>
            <ul>
                <li>
                    <NavLink path="/" text="Home" />
                </li>
                <li>
                    <NavLink path="/menu" text="Menu" />
                </li>
                <li>
                    <NavLink path="/pedidos" text="Pedidos" />
                </li>
                <li>
                    <NavLink path="/auth/login" text="Login" />
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
