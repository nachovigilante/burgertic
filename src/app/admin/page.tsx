'use client';

import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import useAuth from '~/hooks/useAuth';

function AdminLink({
    href,
    title,
    image,
}: {
    href: string;
    title: string;
    image: string;
}) {
    return (
        <Link className="flex flex-col box p-5 gap-2.5 hover:bg-zinc-100 active:bg-zinc-200" href={href}>
            <div
                className="bg-no-repeat bg-center h-[300px] w-[300px] rounded-md bg-cover"
                style={{
                    backgroundImage: `url(${image})`,
                }}
                aria-label={`Imagen de ${title}`}
            />
            <h2 className="text-2xl">{title}</h2>
        </Link>
    );
}

function Admin() {
    const { user } = useAuth();

    if (!user.admin) {
        redirect('/auth/login');
    }

    return (
        <div className="container pt-10 flex flex-col items-center pb-10 min-h-[600px]">
            <h2 className="text-3xl w-full">Admin</h2>
            <div className="flex gap-5 pt-20">
                <AdminLink
                    href="/admin/platos"
                    title="Administrar platos"
                    image="/assets/platos.png"
                />
                <AdminLink
                    href="/admin/pedidos"
                    title="Administrar pedidos"
                    image="/assets/pedidos.png"
                />
            </div>
        </div>
    );
}

export default Admin;
