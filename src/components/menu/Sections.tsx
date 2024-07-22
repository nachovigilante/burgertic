'use client';

import { useQuery } from '@tanstack/react-query';
import useAPIQuery from '~/hooks/useAPIQuery';

export type Product = {
    id: number;
    nombre: string;
    precio: number;
    descripcion: string;
};

const Section = ({
    title,
    type,
    featureItem,
}: {
    title: string;
    type: string;
    featureItem: (id: number) => void;
}) => {
    const { query } = useAPIQuery();

    const { data, isLoading, error } = useQuery({
        queryKey: [type],
        queryFn: () => query<Product[]>(`/platos/tipo/${type}`),
    });

    return (
        <section className="flex flex-col gap-2.5 max-w-[1000px]">
            <h2 className='text-3xl font-bold mb-5 mt-8'>{title}</h2>
            <div className="flex flex-wrap gap-5" id={type}>
                {isLoading && <p>Cargando...</p>}
                {error && <p>Error</p>}
                {data &&
                    data!.response!.map((plato: Product, i: number) => (
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
                            <p className="text-xs font-medium line-clamp-3">{plato.descripcion}</p>
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
            <Section title="Combos" type="combo" featureItem={featureItem} />
            <Section
                title="Principales"
                type="principal"
                featureItem={featureItem}
            />
            <Section title="Postres" type="postre" featureItem={featureItem} />
        </div>
    );
};
