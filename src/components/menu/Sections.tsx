'use client';

import useProducts, { Product } from '~/hooks/useProducts';

const Section = ({
    title,
    type,
    featureItem,
}: {
    title: string;
    type: 'combos' | 'mains' | 'desserts';
    featureItem: (id: number) => void;
}) => {
    const { sections } = useProducts();

    const data = sections[type].data;
    const isLoading = sections[type].loading;
    const error = sections[type].error;

    return (
        <section className="flex flex-col gap-2.5 max-w-[1000px]">
            <h2 className="text-3xl font-bold mb-5 mt-8">{title}</h2>
            <div className="flex flex-wrap gap-5" id={type}>
                {isLoading && <p>Cargando...</p>}
                {error && <p>Error</p>}
                {data &&
                    data.map((plato: Product, i: number) => (
                        <div
                            className="box cursor-pointer hover:scale-105 hover:shadow-large h-[350px] w-[250px]"
                            key={i}
                            onClick={() => featureItem(plato.id)}
                        >
                            <img
                                src="./assets/items/1.png"
                                alt=""
                                className="w-full h-[200px] object-cover"
                            />
                            <h3 className="text-xl font-semibold mb-2 mt-2.5 line-clamp-1">
                                {plato.nombre}
                            </h3>
                            <span className="text-lg font-medium text-[#d72300] mb-2.5">
                                ${plato.precio}
                            </span>
                            <p className="text-xs font-medium line-clamp-3">
                                {plato.descripcion}
                            </p>
                        </div>
                    ))}
            </div>
        </section>
    );
};

export const Sections = ({
    featureItem,
}: {
    featureItem: (id: number) => void;
}) => {
    return (
        <div className="flex-grow">
            <Section title="Combos" type="combos" featureItem={featureItem} />
            <Section
                title="Principales"
                type="mains"
                featureItem={featureItem}
            />
            <Section
                title="Postres"
                type="desserts"
                featureItem={featureItem}
            />
        </div>
    );
};
