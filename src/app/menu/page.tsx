'use client';

import { Modal } from './Modal';
import { Pedido } from './Pedido';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Sections } from './Sections';

const queryClient = new QueryClient();

const Menu = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="container menu">
                <Sections />
                <Pedido />
            </div>
            <Modal />
            <div id="modal-background"></div>
        </QueryClientProvider>
    );
};

export default Menu;
