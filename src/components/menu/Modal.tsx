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
                        isLoading && 'loading',
                        error && 'error',
                        open && 'active',
                    )}
                    onBlur={onClose}
                    tabIndex={1}
                >
                    <button id="close" onClick={onClose}></button>
                    <div className="item">
                        <img src="./assets/items/1.png" alt="" />
                        <div className="info">
                            <div className="top">
                                <h3>{data.response.nombre}</h3>
                                <span className="precio">
                                    ${data.response.precio}
                                </span>
                            </div>
                            <p>{data.response.descripcion}</p>
                        </div>
                    </div>
                    <button
                        id="add"
                        onClick={() =>
                            addItem({
                                id: data.response.id,
                                name: data.response.nombre,
                                price: data.response.precio,
                            })
                        }
                    >
                        <div className="add-btn"></div>
                        <span>Agregar</span>
                    </button>
                </div>
            )}
            <div
                id="modal-background"
                className={twMerge(open && 'active')}
                onClick={onClose}
            />
        </>
    );
};
