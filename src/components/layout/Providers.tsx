'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { SliderProvider } from '~/contexts/SliderContext';
import { AuthProvider } from '~/contexts/UserContext';

const queryClient = new QueryClient();

const Providers = ({ children }: { children: ReactNode }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <SliderProvider>
                <AuthProvider>{children}</AuthProvider>
            </SliderProvider>
        </QueryClientProvider>
    );
};

export default Providers;
