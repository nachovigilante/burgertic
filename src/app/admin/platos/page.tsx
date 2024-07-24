'use client';

import useProducts from '~/hooks/useProducts';

const Admin = () => {
    const { products } = useProducts();

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
                                        <button className="p-2 rounded-lg">
                                            <div className="btn-logo edit-btn h-5 w-5" />
                                        </button>
                                        <button className="p-2 rounded-lg">
                                            <div className="btn-logo delete-btn h-5 w-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Admin;
