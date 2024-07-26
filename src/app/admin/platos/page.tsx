'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AdminProductModal } from '~/components/admin/AdminProductModal';
import LogoButton from '~/components/utils/Button';
import useAuth from '~/hooks/useAuth';
import useProducts from '~/hooks/useProducts';

const Admin = () => {
    const [featuredItemId, setFeaturedItemId] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);
    const { products } = useProducts();

    const { user } = useAuth();

    const router = useRouter();

    if (!user) {
        router.push('/');
        return null;
    }

    return (
        <div className="container pt-10 flex flex-col items-center pb-10 min-h-[600px] gap-10">
            <h2 className="text-3xl w-full">Administrador de platos</h2>
            <div className="box px-5 pb-5">
                <table>
                    <thead className="border-b-2">
                        <tr className="h-12">
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Descripción</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.map((product) => (
                            <tr
                                key={product.id}
                                className="h-16 even:bg-gray-100"
                            >
                                <td className="px-5 py-3">{product.nombre}</td>
                                <td className="px-5 py-3">${product.precio}</td>
                                <td className="px-5 py-3 max-w-[550px]">
                                    <div className="line-clamp-2">
                                        {product.descripcion}
                                    </div>
                                </td>
                                <td>
                                    <div className="flex gap-2 items-center justify-center h-full px-2">
                                        <LogoButton
                                            className="p-2 rounded-lg"
                                            logo="edit"
                                            onClick={() => {
                                                setFeaturedItemId(product.id);
                                                setModalOpen(true);
                                            }}
                                        />
                                        <LogoButton
                                            className="p-2 rounded-lg"
                                            logo="delete"
                                            onClick={() => {
                                                console.log('delete');
                                            }}
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <AdminProductModal
                itemId={featuredItemId}
                open={modalOpen}
                onClose={() => setModalOpen(false)}
            />
        </div>
    );
};

export default Admin;
