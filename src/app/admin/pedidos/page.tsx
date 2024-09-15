'use client';

import { redirect } from 'next/navigation';
import { Pedido } from '~/app/pedidos/page';
import { LoadingSpinner } from '~/components/utils/LoadingSpinner';
import useAuth from '~/hooks/useAuth';
import useOrders from '~/hooks/useOrders';

const Admin = () => {
    const { orders, isLoading, error } = useOrders();

    const { user } = useAuth();

    if (user.id === -1 || !user.admin) redirect('/');

    return (
        <div className="container pt-10 flex flex-col items-center pb-10 min-h-[600px] gap-10">
            <div className="flex justify-between w-full">
                <h2 className="text-3xl w-full">Administrador de pedidos</h2>
            </div>
            {isLoading && <LoadingSpinner />}
            {error && <p>Error cargando los pedidos: {error.message}</p>}
            {orders && orders.length === 0 && (
                <p className="text-2xl py-40 text-gray-500">
                    Usted todavía no ha hecho ningún pedido :(
                </p>
            )}
            {orders && (
                <div className="flex flex-col gap-3 max-w-[600px] w-full">
                    {orders.map((order) => (
                        <Pedido {...order} key={order.id} admin />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Admin;
