import { useQuery } from '@tanstack/react-query';
import { twMerge } from 'tailwind-merge';
import useCart from '~/hooks/useCart';
import useAPIQuery from '~/hooks/useAPIQuery';
import { Product } from '~/hooks/useProducts';
import { Modal } from '../layout/Modal';
import { LoadingSpinner } from '../utils/LoadingSpinner';
import useAuth from '~/hooks/useAuth';

export const ProductModal = ({
    itemId,
    open,
    onClose,
}: {
    itemId: number;
    open: boolean;
    onClose: () => void;
}) => {
    const { query } = useAPIQuery();
    const { data, isLoading, error } = useQuery({
        queryKey: ['item', itemId],
        queryFn: () => query<Product>(`/platos/${itemId}`),
        enabled: open,
    });

    const { addItem } = useCart();

    const { user } = useAuth();

    const isAutehnticated = user.id > -1;

    return (
        <Modal
            open={open}
            onClose={onClose}
            className="w-[630px] h-[420px] flex justify-center"
        >
            {isLoading && (
                <div className="h-full w-full flex justify-center items-center">
                    <LoadingSpinner />
                </div>
            )}
            {error && (
                <div className="flex flex-col gap-2.5 justify-center px-10 py-8 bg-red-300 rounded-md border border-red-900">
                    <h2 className="text-2xl">Error</h2>
                    <span className="text-xl">{error.message}</span>
                    {/* <span className="text-xl">
                        La request no obtuvo respuesta en más de un segundo.
                    </span>
                    <span className="text-xl">
                        Probablemente no estés respondiendo nada en el endpoint
                        o no esté prendido el server.
                    </span> */}
                </div>
            )}
            {data && data.response && !error && (
                <div className="flex flex-col justify-between h-full">
                    <button
                        className="absolute top-2.5 right-2.5 text-3xl cursor-pointer transition-all duration-300 ease-in-out h-[30px] w-[30px] border-none outline-none rounded-lg"
                        onClick={onClose}
                    >
                        <div className="btn-logo close-btn h-[80%] w-[80%]"></div>
                    </button>
                    <div className="flex items-center justify-between gap-10 h-full">
                        <img
                            className="h-[250px] w-[300px] object-cover rounded-[10px]"
                            src="/assets/items/1.png"
                            alt={`Imagen de ${data.response.nombre}`}
                        />
                        <div
                            className={twMerge(
                                'flex flex-col justify-between gap-2.5 w-[300px]',
                                error && 'justify-start',
                                isLoading && 'justify-center items-center',
                            )}
                        >
                            <div>
                                <h3 className="text-[34px] font-bold">
                                    {data.response.nombre}
                                </h3>
                                <span className="text-[27px] font-medium text-[#d72300]">
                                    ${data.response.precio}
                                </span>
                            </div>
                            <p
                                className={twMerge(
                                    'text-[17px] font-normal line-clamp-5 min-h-[100px]',
                                    error &&
                                        'text-xl my-2.5 min-h-0 line-clamp-[10]',
                                )}
                            >
                                {data.response.descripcion}
                            </p>
                        </div>
                    </div>
                    {isAutehnticated && (
                        <button
                            id="add"
                            className="p-2.5 flex gap-2.5"
                            onClick={() =>
                                addItem({
                                    id: data.response.id,
                                    name: data.response.nombre,
                                    price: data.response.precio,
                                })
                            }
                        >
                            <div className="btn-logo add-btn" />
                            <span className="text-xl relative -top-0.5">
                                Agregar
                            </span>
                        </button>
                    )}
                </div>
            )}
        </Modal>
    );
};
