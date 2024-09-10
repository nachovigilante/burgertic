import { useState } from 'react';
import { Product } from '~/hooks/useProducts';

export default function useFeaturedProduct() {
    const [product, setProduct] = useState<Product | null>(null);

    const clearFeaturedProduct = () => {
        setProduct(null);
    };

    const setFeaturedProduct = (product: Product) => {
        setProduct(product);
    };

    return {
        featuredProduct: product,
        setFeaturedProduct,
        clearFeaturedProduct,
    };
}
