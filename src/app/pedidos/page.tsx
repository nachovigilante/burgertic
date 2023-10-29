'use client';

import { twMerge } from 'tailwind-merge';
import useOrders from '~/hooks/useOrders';

const Pedido = ({
    id,
    fecha,
    estado,
    platos,
}: {
    id: number;
    fecha: string;
    estado: string;
    platos: {
        id: number;
        nombre: string;
        precio: number;
        cantidad: number;
    }[];
}) => {
    return (
        <li className="border shadow-[0px_0px_5px_rgba(0,_0,_0,_0.2)] rounded-[10px] px-4 py-3">
            <div className="flex items-center justify-between">
                <div className="flex gap-2 items-center">
                    <div
                        className={twMerge(
                            'rounded-full h-4 w-4 ',
                            estado === 'cancelado' && 'bg-red-500',
                            estado === 'pendiente' && 'bg-yellow-500',
                            estado === 'confirmado' && 'bg-green-500',
                        )}
                    />
                    <h3 className="text-2xl">Pedido {id}</h3>
                </div>
                <p>{new Date(fecha).toLocaleDateString('es-AR')}</p>
            </div>
            <div className="mt-5">
                <h3 className="text-xl">Productos</h3>
                <ul className="flex flex-col">
                    {platos.map((plato) => (
                        <li
                            key={plato.id}
                            className="flex justify-between py-2 border-b items-center px-2 last:border-none"
                        >
                            <div className="">
                                <p>{plato.nombre}</p>
                                <p className="text-primary text-sm">${plato.precio}</p>
                            </div>
                            <p className="text-lg bg-primary text-white flex justify-center items-center rounded-md w-[28px] h-[30px]">
                                {plato.cantidad}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </li>
    );
};

const Pedidos = () => {
    const { orders, isLoading, error } = useOrders();

    return (
        <div className="container pt-10 flex flex-col items-center">
            <h2 className="text-3xl w-full">Tus pedidos</h2>
            {isLoading && <p>Cargando...</p>}
            {error && <p>Error</p>}
            {orders && (
                <ul className="mt-8 flex flex-col gap-3 max-w-[600px] w-full">
                    {orders.map((order) => (
                        <Pedido {...order} key={order.id} />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Pedidos;
