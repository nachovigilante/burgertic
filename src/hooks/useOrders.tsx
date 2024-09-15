import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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
    const queryClient = useQueryClient();

    const {
        data: orders,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['orders'],
        queryFn: () => query<Order[]>('/pedidos/usuario', true),
    });

    const orderMutation = useMutation({
        mutationFn: (products: OrderItem[]) => {
            return mutation<{ platos: OrderItem[] }, { message: string }>(
                '/pedidos',
                {
                    platos: products,
                },
                true,
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
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
        orderMutation.mutate(products);
    };

    const updateOrderMutation = useMutation({
        mutationFn: (payload: {
            id: number;
            action: 'aceptar' | 'comenzar' | 'entregar';
        }) => {
            return mutation<{}, { message: string }>(
                `/pedidos/${payload.id}/${payload.action}`,
                {},
                true,
                'PUT',
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
        },
    });

    const updateOrder = (
        id: number,
        action: 'aceptar' | 'comenzar' | 'entregar',
    ) => {
        updateOrderMutation.mutate({ id, action });
    };

    const acceptOrder = (id: number) => {
        updateOrder(id, 'aceptar');
    };

    const startDelivery = (id: number) => {
        updateOrder(id, 'comenzar');
    };

    const deliverOrder = (id: number) => {
        updateOrder(id, 'entregar');
    };

    return {
        orders: orders?.response.sort((o1, o2) => o2.id - o1.id),
        isLoading,
        error,
        placeOrder,
        placeOrderPending: orderMutation.isPending,
        placeOrderError: orderMutation.error,
        placeOrderSuccess: orderMutation.isSuccess,
        placeOrderReset: orderMutation.reset,
        acceptOrder,
        startDelivery,
        deliverOrder,
        updateOrderPending: updateOrderMutation.isPending,
        updateOrderError: updateOrderMutation.error,
        updateOrderSuccess: updateOrderMutation.isSuccess,
        resetUpdateOrder: updateOrderMutation.reset,
    };
};

export default useOrders;
