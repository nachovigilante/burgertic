import { useMutation, useQuery } from '@tanstack/react-query';
import useAPIQuery from './useAPIQuery';
import { CartItem } from '~/contexts/CartContext';

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

type OrderItem = {
    id: number;
    cantidad: number;
};

const useOrders = () => {
    const { query, mutation } = useAPIQuery();

    const {
        data: orders,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['orders'],
        queryFn: () => query<Order[]>('pedidos'),
    });

    const orderMutation = useMutation({
        mutationFn: (products: OrderItem[]) => {
            return mutation<{ productos: OrderItem[] }, { id: number }>(
                'pedido',
                {
                    productos: products,
                },
            );
        },
    });

    const placeOrder = (cart: CartItem[]) => {
        const products = cart.map(
            ({ item, quantity }) =>
                ({
                    id: item.id,
                    cantidad: quantity,
                }) as OrderItem,
        );
        console.log(products);
        orderMutation.mutate(products);
    };

    return {
        orders,
        isLoading,
        error,
        placeOrder,
        placeOrderPending: orderMutation.isPending,
        placeOrderError: orderMutation.error,
        placeOrderData: orderMutation.data,
        placeOrderSuccess: orderMutation.isSuccess,
        placeOrderReset: orderMutation.reset,
    };
};

export default useOrders;
