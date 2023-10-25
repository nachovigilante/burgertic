import Navbar from './Navbar';

const Header = () => {
    return (
        <header>
            <div className="container">
                <a className="logo" href="./">
                    <img src="./assets/logo.svg" alt="" />
                </a>
                <Navbar />
            </div>
        </header>
    );
};

export default Header;
