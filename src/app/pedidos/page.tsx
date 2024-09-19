'use client';

import { redirect } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import { LoadingSpinner } from '~/components/utils/LoadingSpinner';
import useAuth from '~/hooks/useAuth';
import useOrders from '~/hooks/useOrders';

const Status = ({ status }: { status: string }) => {
    return (
        <div className="flex gap-1.5 items-center">
            <div
                className={twMerge(
                    'rounded-full h-4 w-4 ',
                    status === 'pendiente' && 'bg-yellow-500',
                    status === 'aceptado' && 'bg-green-500',
                    status === 'en camino' && 'bg-blue-500',
                    status === 'entregado' && 'bg-gray-500',
                )}
            />
            <span>
                {status === 'pendiente' && 'Pendiente'}
                {status === 'aceptado' && 'Aceptado'}
                {status === 'en camino' && 'En camino'}
                {status === 'entregado' && 'Entregado'}
            </span>
        </div>
    );
};

export const Pedido = ({
    id,
    fecha,
    estado,
    platos,
    admin = false,
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
    admin?: boolean;
}) => {
    const { acceptOrder, startDelivery, deliverOrder } = useOrders();

    return (
        <div className="border shadow-[0px_0px_5px_rgba(0,_0,_0,_0.2)] rounded-[10px] px-4 py-3 w-full">
            <div className="flex items-start justify-between">
                <div className="flex gap-4 items-center">
                    <h3 className="text-2xl">Pedido {id}</h3>
                    <p className="text-gray-700">
                        {new Date(fecha).toLocaleDateString('es-AR')}
                    </p>
                </div>
                <Status status={estado} />
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
                                <p className="text-primary text-sm">
                                    ${plato.precio}
                                </p>
                            </div>
                            <p className="text-lg bg-primary text-white flex justify-center items-center rounded-md w-[28px] h-[30px]">
                                {plato.cantidad}
                            </p>
                        </li>
                    ))}
                </ul>
                <div
                    className={twMerge(
                        'hidden w-full justify-center',
                        admin && estado !== 'entregado' && 'flex',
                    )}
                >
                    <button
                        className="px-4 py-2"
                        onClick={
                            estado === 'pendiente'
                                ? () => acceptOrder(id)
                                : estado === 'aceptado'
                                ? () => startDelivery(id)
                                : () => deliverOrder(id)
                        }
                    >
                        {estado === 'pendiente' && 'Aceptar pedido'}
                        {estado === 'aceptado' && 'Comenzar entrega'}
                        {estado === 'en camino' && 'Entregar pedido'}
                    </button>
                </div>
            </div>
        </div>
    );
};

const Pedidos = () => {
    const { userOrders, userOrdersLoading, userOrdersError } = useOrders();
    const { user } = useAuth();

    if (user.id === -1) redirect('/auth/login');

    return (
        <div className="container pt-10 flex flex-col items-center pb-10 min-h-screen">
            <h2 className="text-3xl w-full">Tus pedidos</h2>
            {userOrdersLoading && <LoadingSpinner />}
            {userOrdersError && <p>Error</p>}
            {userOrders && userOrders.length === 0 && (
                <p className="text-2xl py-40 text-gray-500">
                    Usted todavía no ha hecho ningún pedido :(
                </p>
            )}
            {userOrders && (
                <div className="mt-8 flex flex-col gap-3 max-w-[600px] w-full">
                    {userOrders.map((order) => (
                        <Pedido {...order} key={order.id} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Pedidos;
