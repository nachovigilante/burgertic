'use client';

import { Modal } from '../../components/menu/Modal';
import { Pedido } from '../../components/menu/Pedido';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Sections } from '../../components/menu/Sections';
import { useState } from 'react';
import { CartProvider } from '~/contexts/CartContext';

const queryClient = new QueryClient();

const Menu = () => {
    const [featuredItemId, setFeaturedItemId] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <QueryClientProvider client={queryClient}>
            <CartProvider>
                <div className="container menu">
                    <Sections
                        featureItem={(id: number) => {
                            setFeaturedItemId(id);
                            setModalOpen(true);
                        }}
                    />
                    <Pedido />
                </div>
                <Modal
                    itemId={featuredItemId}
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                />
                <div id="modal-background"></div>
            </CartProvider>
        </QueryClientProvider>
    );
};

export default Menu;
