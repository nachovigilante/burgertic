import { useQuery } from '@tanstack/react-query';
import { twMerge } from 'tailwind-merge';

export const Modal = ({
    itemId,
    open,
    onClose,
}: {
    itemId: number;
    open: boolean;
    onClose: () => void;
}) => {
    const getItem = async () => {
        const response = await fetch(`http://localhost:9000/menu/${itemId}`);
        const item = await response.json();

        return item;
    };

    const {
        data: item,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['item', itemId],
        queryFn: getItem,
        enabled: open,
    });

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
            {item && (
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
                                <h3>{item.nombre}</h3>
                                <span className="precio">${item.precio}</span>
                            </div>
                            <p>{item.descripcion}</p>
                        </div>
                    </div>
                    <button id="add">
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
