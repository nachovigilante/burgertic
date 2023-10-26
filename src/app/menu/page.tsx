'use client';

import { Modal } from './Modal';
import { Pedido } from './Pedido';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Sections } from './Sections';
import { useState } from 'react';

const queryClient = new QueryClient();

const Menu = () => {
    const [featuredItemId, setFeaturedItemId] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <QueryClientProvider client={queryClient}>
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
        </QueryClientProvider>
    );
};

export default Menu;
