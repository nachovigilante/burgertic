import useProducts, { Product } from '~/hooks/useProducts';
import { Modal } from '../layout/Modal';
import LogoButton from '../utils/Button';
import { useEffect, useRef } from 'react';
import { LoadingSpinner } from '../utils/LoadingSpinner';

export const AdminProductModal = ({
    featuredProduct,
    open,
    onClose,
}: {
    featuredProduct: Product | null;
    open: boolean;
    onClose: () => void;
}) => {
    const {
        updateProduct,
        updateProductMutation: {
            isPending: isUpdating,
            error: updateError,
            isSuccess: updateSuccess,
            reset: resetUpdateProduct,
        },
    } = useProducts();
    const formRef = useRef<HTMLFormElement>(null);

    // Load the featured product data into the form
    useEffect(() => {
        if (!featuredProduct) return;
        if (!formRef.current) return;

        formRef.current.nombre.value = featuredProduct.nombre;
        formRef.current.descripcion.value = featuredProduct.descripcion;
        formRef.current.precio.value = featuredProduct.precio;
        formRef.current.tipo.value = featuredProduct.tipo;
        resetUpdateProduct();
    }, [featuredProduct]);

    if (!featuredProduct) return null;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const nombre = e.currentTarget.nombre.value;
        const descripcion = e.currentTarget.descripcion.value;
        const precio = e.currentTarget.precio.value;
        const tipo = e.currentTarget.tipo.value;

        updateProduct({
            id: featuredProduct.id,
            nombre,
            descripcion,
            precio,
            tipo,
        });
    };

    return (
        <Modal open={open} onClose={onClose}>
            {/* <LogoButton
                className="absolute top-2.5 right-2.5 text-3xl cursor-pointer transition-all duration-300 ease-in-out h-[30px] w-[30px] border-none outline-none rounded-lg overflow-hidden"
                logo="close"
                onClick={onClose}
            /> */}
            {(updateError || updateSuccess || isUpdating) && (
                <div className="absolute inset-0 top-0 left-0 bg-white z-[60] border flex justify-center items-center rounded-lg overflow-hidden">
                    {updateSuccess && (
                        <div className="flex flex-col justify-center items-center gap-4">
                            <p className='text-xl'>Se ha actualizado el producto</p>
                            <button onClick={onClose} className='py-2 px-4 font-medium text-lg'>Aceptar</button>
                        </div>
                    )}
                    {updateError && (
                        <div className="absolute inset-0 top-0 left-0 z-[60] border flex justify-center items-center text-xl">
                            Ha ocurrido un error: {updateError.message}
                        </div>
                    )}
                    {isUpdating && <LoadingSpinner />}
                </div>
            )}
            <form
                className="flex flex-col items-center gap-5"
                onSubmit={handleSubmit}
                ref={formRef}
            >
                <div className="flex flex-col items-center justify-between gap-10">
                    <img
                        src="/assets/items/1.png"
                        alt={`Imagen de ${featuredProduct.nombre}`}
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
                            >
                                <option value="combo">Combo</option>
                                <option value="principal">Principal</option>
                                <option value="postre">Postre</option>
                            </select>
                        </div>
                        <div className="flex items-center gap-3 justify-end">
                            <label htmlFor="descripcion" className="text-lg">
                                Descripción:
                            </label>
                            <textarea
                                id="descripcion"
                                name="descripcion"
                                className="text-lg"
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
        </Modal>
    );
};
