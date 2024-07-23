'use client';

import Link from 'next/link';
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
        <Link className="flex flex-col box p-5 gap-2.5" href={href}>
            <img src={image} alt="platos" width="300px" />
            <h2 className="text-2xl">{title}</h2>
        </Link>
    );
}

function Admin() {
    const { user } = useAuth();

    if (!user.admin) {
        return (
            <div className="container pt-10 flex flex-col items-center pb-10">
                <h2 className="text-3xl w-full">Admin</h2>
                <p>No tienes permisos de administrador</p>
            </div>
        );
    }

    return (
        <div className="container pt-10 flex flex-col items-center pb-10 min-h-[600px]">
            <h2 className="text-3xl w-full">Admin</h2>
            <div className="flex gap-5 pt-20">
                <AdminLink
                    href="/admin/platos"
                    title="Administrar platos"
                    image="/assets/items/1.png"
                />
                <AdminLink
                    href="/admin/usuarios"
                    title="Administrar usuarios"
                    image="/assets/items/2.png"
                />
                <AdminLink
                    href="/admin/pedidos"
                    title="Administrar pedidos"
                    image="/assets/items/3.png"
                />
            </div>
        </div>
    );
}

export default Admin;