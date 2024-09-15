'use client';

import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { AdminProductModal } from '~/components/admin/AdminProductModal';
import LogoButton from '~/components/utils/Button';
import { LoadingSpinner } from '~/components/utils/LoadingSpinner';
import useAuth from '~/hooks/useAuth';
import useFeaturedItem from '~/hooks/useFeaturedProdcut';
import useProducts, { Product } from '~/hooks/useProducts';

const Admin = () => {
    const {
        featuredItem: featuredProduct,
        setFeaturedItem: setFeaturedProduct,
        clearFeaturedItem: clearFeaturedProduct,
    } = useFeaturedItem<Product>();
    const [modalOpen, setModalOpen] = useState(false);
    const [action, setAction] = useState<'update' | 'create'>('create');
    const [orderBy, setOrderBy] = useState<
        'name_asc' | 'name_desc' | 'price_asc' | 'price_desc'
    >('name_asc');
    const { products, deleteProduct, productsLoading, productsError } =
        useProducts();
    const [sortedProducts, setSortedProducts] = useState<Product[] | null>(
        null,
    );

    const { user } = useAuth();

    if (user.id === -1 || !user.admin) redirect('/');

    useEffect(() => {
        if (!products) {
            setSortedProducts(null);
            return;
        }

        const sortedProducts = [...products].sort((a, b) => {
            if (orderBy === 'name_asc') {
                return a.nombre.localeCompare(b.nombre);
            } else if (orderBy === 'name_desc') {
                return b.nombre.localeCompare(a.nombre);
            } else if (orderBy === 'price_asc') {
                return a.precio - b.precio;
            } else {
                return b.precio - a.precio;
            }
        });

        setSortedProducts(sortedProducts);
    }, [orderBy, products]);

    return (
        <div className="container pt-10 flex flex-col items-center pb-10 min-h-[600px] gap-10">
            <div className="flex justify-between w-full">
                <h2 className="text-3xl w-full">Administrador de platos</h2>
                <button
                    className="w-[220px] gap-2 py-2"
                    onClick={() => {
                        clearFeaturedProduct();
                        setAction('create');
                        setModalOpen(true);
                    }}
                >
                    <div className="btn-logo add-btn" />
                    <span className="text-xl relative -top-0.5">
                        Agregar plato
                    </span>
                </button>
            </div>
            {productsLoading && <LoadingSpinner />}
            {productsError && (
                <div className="text-center text-red-500">
                    Error al cargar los productos: {productsError.message}
                </div>
            )}
            {sortedProducts && sortedProducts.length === 0 && (
                <div className="text-center text-gray-500">
                    No hay platos para mostrar
                </div>
            )}
            {sortedProducts && !productsLoading && !productsError && (
                <div className="box px-5 pb-5">
                    <table>
                        <thead className="border-b-2">
                            <tr className="h-12">
                                <th>
                                    <div
                                        className="flex gap-2 justify-center items-center p-4 cursor-pointer select-none hover:bg-zinc-100 active:bg-zinc-200"
                                        onClick={() => {
                                            if (orderBy === 'name_asc') {
                                                setOrderBy('name_desc');
                                            } else {
                                                setOrderBy('name_asc');
                                            }
                                        }}
                                    >
                                        Nombre
                                        <div
                                            className={twMerge(
                                                'h-4 w-4 bg-contain bg-no-repeat',
                                                orderBy === 'name_asc' &&
                                                    'sort-asc-btn',
                                                orderBy === 'name_desc' &&
                                                    'sort-desc-btn',
                                            )}
                                        />
                                    </div>
                                </th>
                                <th>
                                    <div
                                        className="flex gap-2 justify-center items-center p-4 cursor-pointer select-none hover:bg-zinc-100 active:bg-zinc-200"
                                        onClick={() => {
                                            if (orderBy === 'price_asc') {
                                                setOrderBy('price_desc');
                                            } else {
                                                setOrderBy('price_asc');
                                            }
                                        }}
                                    >
                                        Precio
                                        <div
                                            className={twMerge(
                                                'h-4 w-4 bg-contain bg-no-repeat',
                                                orderBy === 'price_asc' &&
                                                    'sort-asc-btn',
                                                orderBy === 'price_desc' &&
                                                    'sort-desc-btn',
                                            )}
                                        />
                                    </div>
                                </th>
                                <th>Descripción</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedProducts?.map((product) => (
                                <tr
                                    key={product.id}
                                    className="h-16 even:bg-gray-100"
                                >
                                    <td className="px-5 py-3">
                                        {product.nombre}
                                    </td>
                                    <td className="px-5 py-3">
                                        ${product.precio}
                                    </td>
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
            )}
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
