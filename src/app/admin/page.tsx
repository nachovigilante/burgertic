'use client';

import Link from 'next/link';
import useAuth from '~/hooks/useAuth';

const Admin = () => {
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
        <div className="container pt-10 flex flex-col items-center pb-10">
            <h2 className="text-3xl w-full">Admin</h2>
            <Link className="" href={`/admin/platos`}>
                <div className="flex flex-col">
                    <img src="/assets/items/1.png" alt="platos" width="300px" />
                    <p>Administrar platos</p>
                </div>
            </Link>
            <Link className="" href={`/admin/usuarios`}>
                Administrar usuarios
            </Link>
            <Link className="" href={`/admin/pedidos`}>
                Administrar pedidos
            </Link>
        </div>
    );
};

export default Admin;
