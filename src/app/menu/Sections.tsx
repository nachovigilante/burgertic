'use client';

import { useQuery } from '@tanstack/react-query';

type Plato = {
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
    const getItems = async () => {
        const response = await fetch(`http://localhost:9000/${type}`);
        const items = await response.json();

        return items;
    };

    const {
        data: items,
        isLoading,
        error,
    } = useQuery({
        queryKey: [type],
        queryFn: getItems,
    });

    return (
        <section>
            <h2>{title}</h2>
            <div className="grid" id={type}>
                {isLoading && <p>Cargando...</p>}
                {error && <p>Error</p>}
                {items &&
                    items.map((plato: Plato, i: number) => (
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
            <Section title="Combos" type="combos" featureItem={featureItem} />
            <Section
                title="Principales"
                type="principales"
                featureItem={featureItem}
            />
            <Section title="Postres" type="postres" featureItem={featureItem} />
        </div>
    );
};
