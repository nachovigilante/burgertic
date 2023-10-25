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
            </ul>
        </nav>
    );
};

export default Navbar;
