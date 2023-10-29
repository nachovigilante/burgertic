import { useQuery } from '@tanstack/react-query';
import useAPIQuery from './useAPIQuery';

export type Order = {
    id: number;
    id_usuario: number;
    fecha: string;
    estado: string;
    platos: {
        id: number;
        nombre: string;
        precio: number;
        cantidad: number;
    }[];
};

const useOrders = () => {
    const { query } = useAPIQuery();

    const {
        data: orders,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['orders'],
        queryFn: () => query<Order[]>('pedidos'),
    });

    return { orders, isLoading, error };
};

export default useOrders;
