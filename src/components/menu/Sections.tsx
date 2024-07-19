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
        <section>
            <h2>{title}</h2>
            <div className="grid" id={type}>
                {isLoading && <p>Cargando...</p>}
                {error && <p>Error</p>}
                {data &&
                    data!.response!.map((plato: Product, i: number) => (
                        <div
                            className="item"
                            key={i}
                            onClick={() => featureItem(plato.id)}
                        >
                            <img src="./assets/items/1.png" alt="" />
                            <h3>{plato.nombre}</h3>
                            <span className="precio">${plato.precio}</span>
                            <p>{plato.descripcion}</p>
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
        <div className="sections">
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
