import { useMutation, useQuery } from '@tanstack/react-query';
import useAPIQuery from './useAPIQuery';

export type Product = {
    id: number;
    nombre: string;
    precio: number;
    descripcion: string;
};

const useProducts = () => {
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
        mutationFn: (product: Product) => {
            return mutation<Product, { message: string }>(
                '/platos',
                product,
                true,
            );
        },
    });

    const addProduct = (product: Product) => {
        addProductMutation.mutate(product);
    };

    const deleteProductMutation = useMutation({
        mutationFn: (id: number) => {
            return mutation<{ id: number }, { message: string }>(
                `/platos/${id}`,
                { id },
                true,
            );
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
                },
                { message: string }
            >(
                `/platos/${product.id}`,
                {
                    nombre: product.nombre,
                    precio: product.precio,
                    descripcion: product.descripcion,
                },
                true,
            );
        },
    });

    const updateProduct = (product: Product) => {
        updateProductMutation.mutate(product);
    };

    const sections = {
        combos: {
            data: combos?.response,
            loading: combosLoading,
            error: combosError,
        },
        mains: {
            data: mains?.response,
            loading: mainsLoading,
            error: mainsError,
        },
        desserts: {
            data: desserts?.response,
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
    };
};

export default useProducts;
