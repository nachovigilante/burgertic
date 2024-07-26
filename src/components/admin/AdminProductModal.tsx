import { useQuery } from '@tanstack/react-query';
import useAPIQuery from '~/hooks/useAPIQuery';
import useProducts, { Product } from '~/hooks/useProducts';
import { Modal } from '../layout/Modal';
import LogoButton from '../utils/Button';

export const AdminProductModal = ({
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
        queryKey: [`item-${itemId}`],
        queryFn: () => query<Product>(`/platos/${itemId}`),
        enabled: open,
    });

    const {
        updateProduct,
        updateProductMutation: {
            isPending: isUpdating,
            isError: updateError,
            isSuccess: updateSuccess,
        },
    } = useProducts();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const nombre = e.currentTarget.nombre.value;
        const descripcion = e.currentTarget.descripcion.value;
        const precio = e.currentTarget.precio.value;
        const tipo = e.currentTarget.tipo.value;

        updateProduct({
            id: itemId,
            nombre,
            descripcion,
            precio,
            tipo,
        });
    };

    return (
        <Modal open={open} onClose={onClose}>
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
                <>
                    <LogoButton
                        className="absolute top-2.5 right-2.5 text-3xl cursor-pointer transition-all duration-300 ease-in-out h-[30px] w-[30px] border-none outline-none rounded-lg"
                        logo="close"
                        onClick={onClose}
                    />
                    <form
                        className="flex flex-col items-center gap-5"
                        onSubmit={handleSubmit}
                    >
                        <div className="flex flex-col items-center justify-between gap-10">
                            <img
                                src="/assets/items/1.png"
                                alt={`Imagen de ${data.response.nombre}`}
                                className="w-40 h-40 object-cover rounded-lg"
                            />
                            <div className="flex flex-col gap-5">
                                <div className="flex items-center gap-3 justify-end">
                                    <label htmlFor="nombre" className="text-lg">
                                        Nombre:
                                    </label>
                                    <input
                                        id="nombre"
                                        name="nombre"
                                        type="text"
                                        className="text-lg"
                                        defaultValue={data.response.nombre}
                                    />
                                </div>
                                <div className="flex items-center gap-3 justify-end">
                                    <label htmlFor="tipo" className="text-lg">
                                        Tipo:
                                    </label>
                                    <select
                                        id="tipo"
                                        name="tipo"
                                        className="text-lg min-w-[223px]"
                                        defaultValue={data.response.tipo}
                                    >
                                        <option value="combo">Combo</option>
                                        <option value="principal">
                                            Principal
                                        </option>
                                        <option value="postre">Postre</option>
                                    </select>
                                </div>
                                <div className="flex items-center gap-3 justify-end">
                                    <label
                                        htmlFor="descripcion"
                                        className="text-lg"
                                    >
                                        Descripción:
                                    </label>
                                    <textarea
                                        id="descripcion"
                                        name="descripcion"
                                        className="text-lg"
                                        defaultValue={data.response.descripcion}
                                    />
                                </div>
                                <div className="flex items-center gap-3 justify-end">
                                    <label htmlFor="precio" className="text-lg">
                                        Precio:
                                    </label>
                                    <input
                                        id="precio"
                                        name="precio"
                                        type="number"
                                        className="text-lg"
                                        defaultValue={data.response.precio}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-5">
                            <button
                                className="px-5 py-2 font-medium"
                                onClick={(e) => {
                                    e.preventDefault();
                                    onClose();
                                }}
                                tabIndex={1}
                            >
                                Cancelar
                            </button>
                            <button className="px-5 py-2 font-medium" tabIndex={0}>
                                Confirmar
                            </button>
                        </div>
                    </form>
                </>
            )}
        </Modal>
    );
};
