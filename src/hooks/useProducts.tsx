import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAPIQuery from './useAPIQuery';

export type Product = {
    id: number;
    nombre: string;
    precio: number;
    descripcion: string;
    tipo: string;
};

const useProducts = () => {
    const queryClient = useQueryClient();
    const { query, mutation } = useAPIQuery();

    const {
        data: products,
        isLoading: productsLoading,
        error: productsError,
    } = useQuery({
        queryKey: ['products'],
        queryFn: () => query<Product[]>('/platos', true),
    });

    const {
        data: combos,
        isLoading: combosLoading,
        error: combosError,
    } = useQuery({
        queryKey: ['combos'],
        queryFn: () => query<Product[]>('/platos/tipo/combo', true),
    });

    const {
        data: mains,
        isLoading: mainsLoading,
        error: mainsError,
    } = useQuery({
        queryKey: ['main'],
        queryFn: () => query<Product[]>('/platos/tipo/principal', true),
    });

    const {
        data: desserts,
        isLoading: dessertsLoading,
        error: dessertsError,
    } = useQuery({
        queryKey: ['desserts'],
        queryFn: () => query<Product[]>('/platos/tipo/postre', true),
    });

    const addProductMutation = useMutation({
        mutationFn: (product: {
            nombre: string;
            precio: number;
            descripcion: string;
            tipo: string;
        }) => {
            return mutation<
                {
                    nombre: string;
                    precio: number;
                    descripcion: string;
                    tipo: string;
                },
                { message: string }
            >('/platos', product, true);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['products'],
            });
        },
    });

    const addProduct = (product: {
        nombre: string;
        precio: number;
        descripcion: string;
        tipo: string;
    }) => {
        addProductMutation.mutate(product);
    };

    const deleteProductMutation = useMutation({
        mutationFn: (id: number) => {
            return mutation<{ id: number }, { message: string }>(
                `/platos/${id}`,
                { id },
                true,
                'DELETE',
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['products'],
            });
        },
    });

    const deleteProduct = (id: number) => {
        deleteProductMutation.mutate(id);
    };

    const updateProductMutation = useMutation({
        mutationFn: (product: Product) => {
            return mutation<
                {
                    nombre: string;
                    precio: number;
                    descripcion: string;
                    tipo: string;
                },
                { message: string }
            >(
                `/platos/${product.id}`,
                {
                    nombre: product.nombre,
                    precio: product.precio,
                    descripcion: product.descripcion,
                    tipo: product.tipo,
                },
                true,
                'PUT',
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['products'],
            });
        },
    });

    const updateProduct = (product: Product) => {
        updateProductMutation.mutate(product);
    };

    const sections = {
        combos: {
            data: combos?.response.sort((a, b) => a.id - b.id),
            loading: combosLoading,
            error: combosError,
        },
        mains: {
            data: mains?.response.sort((a, b) => a.id - b.id),
            loading: mainsLoading,
            error: mainsError,
        },
        desserts: {
            data: desserts?.response.sort((a, b) => a.id - b.id),
            loading: dessertsLoading,
            error: dessertsError,
        },
    };

    return {
        products: products?.response,
        productsLoading,
        productsError,
        addProduct,
        deleteProduct,
        updateProduct,
        sections,
        updateProductMutation,
        deleteProductMutation,
        addProductMutation,
    };
};

export default useProducts;
