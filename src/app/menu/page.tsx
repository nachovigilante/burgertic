'use client';

import useAuth from '~/hooks/useAuth';
import { Modal } from '../../components/menu/Modal';
import { Pedido } from '../../components/menu/Pedido';
import { Sections } from '../../components/menu/Sections';
import { useState } from 'react';
import { CartProvider } from '~/contexts/CartContext';
import { useRouter } from 'next/navigation';

const Menu = () => {
    const [featuredItemId, setFeaturedItemId] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);

    const { user } = useAuth();
    const router = useRouter();

    if (user.id === -1) {
        router.push('/auth/login');
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
            <Modal
                itemId={featuredItemId}
                open={modalOpen}
                onClose={() => setModalOpen(false)}
            />
            <div id="modal-background"></div>
        </CartProvider>
    );
};

export default Menu;
