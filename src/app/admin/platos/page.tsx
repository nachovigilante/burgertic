'use client';

import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AdminProductModal } from '~/components/admin/AdminProductModal';
import LogoButton from '~/components/utils/Button';
import useAuth from '~/hooks/useAuth';
import useFeaturedProduct from '~/hooks/useFeaturedProdcut';
import useProducts from '~/hooks/useProducts';

const Admin = () => {
    const { featuredProduct, setFeaturedProduct, clearFeaturedProduct } = useFeaturedProduct();
    const [modalOpen, setModalOpen] = useState(false);
    const [action, setAction] = useState<'update' | 'create'>('create');
    const { products, deleteProduct } = useProducts();

    const { user } = useAuth();

    if (user.id === -1) redirect('/');

    return (
        <div className="container pt-10 flex flex-col items-center pb-10 min-h-[600px] gap-10">
            <div className="flex justify-between w-full">
                <h2 className="text-3xl w-full">Administrador de platos</h2>
                <button className='w-[220px] gap-2 py-2' onClick={() => {
                    clearFeaturedProduct();
                    setAction('create');
                    setModalOpen(true);
                }}>
                    <div className="btn-logo add-btn" />
                    <span className="text-xl relative -top-0.5">
                        Agregar plato
                    </span>
                </button>
            </div>
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
                                                setFeaturedProduct(product);
                                                setAction('update');
                                                setModalOpen(true);
                                            }}
                                        />
                                        <LogoButton
                                            className="p-2 rounded-lg"
                                            logo="delete"
                                            onClick={() => {
                                                deleteProduct(product.id);
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
                featuredProduct={featuredProduct}
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                action={action}
            />
        </div>
    );
};

export default Admin;
