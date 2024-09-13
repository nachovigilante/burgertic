import { useState } from 'react';
import { Product } from '~/hooks/useProducts';

export default function useFeaturedItem<T>() {
    const [item, setItem] = useState<T | null>(null);

    const clearFeaturedItem = () => {
        setItem(null);
    };

    const setFeaturedItem = (item: T) => {
        setItem(item);
    };

    return {
        featuredItem: item,
        setFeaturedItem,
        clearFeaturedItem,
    };
}
