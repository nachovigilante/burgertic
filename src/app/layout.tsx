import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '~/components/layout/Header';
import Providers from '~/components/layout/Providers';

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
                    href="/assets/favicon.ico"
                    type="image/x-icon"
                />
                <Providers>
                    <Header />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
