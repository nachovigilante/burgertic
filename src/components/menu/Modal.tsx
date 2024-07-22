import { useQuery } from '@tanstack/react-query';
import { twMerge } from 'tailwind-merge';
import useCart from '~/hooks/useCart';
import { Product } from './Sections';
import useAPIQuery from '~/hooks/useAPIQuery';

export const Modal = ({
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

    return (
        <>
            {isLoading && (
                <div className="info">
                    <h2>Error</h2>
                    <span>No se encontró la ruta.</span>
                    <span>
                        Puede ser por 2 razones: no está implementado el
                        endpoint o el id es inválido.
                    </span>
                </div>
            )}
            {error && (
                <div className="info">
                    <h2>Error</h2>
                    <span>
                        La request no obtuvo respuesta en más de un segundo.
                    </span>
                    <span>
                        Probablemente no estés respondiendo nada en el endpoint
                        o no esté prendido el server.
                    </span>
                </div>
            )}
            {data && data.response && (
                <div
                    id="modal"
                    className={twMerge(
                        'fixed box opacity-0 pointer-events-none p-8 transition-all duration-300 ease-in-out top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50 shadow-large',
                        isLoading && 'loading',
                        error && 'error',
                        open && 'opacity-100 pointer-events-auto',
                    )}
                    onBlur={onClose}
                    tabIndex={1}
                >
                    <button
                        id="close"
                        className="absolute top-2.5 right-2.5 text-3xl cursor-pointer transition-all duration-300 ease-in-out h-[30px] w-[30px] border-none outline-none rounded-lg"
                        onClick={onClose}
                    >
                        <div className="btn-logo close-btn h-[80%] w-[80%]"></div>
                    </button>
                    <div className="flex items-center justify-between gap-10">
                        <img className="h-[300px] w-[300px] object-cover rounded-[10px]" src="./assets/items/1.png" alt="Foto del producto" />
                        <div
                            className={twMerge(
                                'flex flex-col justify-between gap-2.5 w-[300px] h-[200px]',
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
                    {!error && !isLoading && (
                        <button
                            id="add"
                            className='p-2.5 flex gap-2.5'
                            onClick={() =>
                                addItem({
                                    id: data.response.id,
                                    name: data.response.nombre,
                                    price: data.response.precio,
                                })
                            }
                        >
                            <div className="btn-logo add-btn" />
                            <span className='text-xl'>Agregar</span>
                        </button>
                    )}
                </div>
            )}
            <div
                id="modal-background"
                className={twMerge(
                    'fixed inset-0 bg-black/20 backdrop-blur-sm hidden justify-center items-center',
                    open && 'flex',
                )}
                onClick={onClose}
            />
        </>
    );
};
