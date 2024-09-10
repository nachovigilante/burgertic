'use client';

import useAuth from '~/hooks/useAuth';
import { ProductModal } from '../../components/menu/ProductModal';
import { Pedido } from '../../components/menu/Pedido';
import { Sections } from '../../components/menu/Sections';
import { useState } from 'react';
import { CartProvider } from '~/contexts/CartContext';
import { redirect } from 'next/navigation';

const Menu = () => {
    const [featuredItemId, setFeaturedItemId] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);

    const { user } = useAuth();

    if (!user) {
        redirect('/');
        return null;
    }

    return (
        <CartProvider>
            <div className="container flex flex-row gap-5 pt-5 pb-14">
                <Sections
                    featureItem={(id: number) => {
                        setFeaturedItemId(id);
                        setModalOpen(true);
                    }}
                />
                <Pedido />
            </div>
            <ProductModal
                itemId={featuredItemId}
                open={modalOpen}
                onClose={() => setModalOpen(false)}
            />
        </CartProvider>
    );
};

export default Menu;
