import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Burger Tic',
    description: '',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="es">
            <body className="flex flex-col min-h-screen items-center bg-background overflow-x-hidden overflow-y-scroll">
                <link
                    rel="shortcut icon"
                    href="./assets/favicon.ico"
                    type="image/x-icon"
                />
                <header>
                    <div className="container">
                        <a className="logo" href="./">
                            <img src="./assets/logo.svg" alt="" />
                        </a>
                        <nav>
                            <ul>
                                <li>
                                    <a href="./" className="highlighted">
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a href="./menu.html">Menú</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </header>
                {children}
            </body>
        </html>
    );
}
