'use client';

import { useQuery } from '@tanstack/react-query';

type Plato = {
    nombre: string;
    precio: number;
    descripcion: string;
};

const Section = ({ title, type }: { title: string; type: string }) => {
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
            <h2>Combos</h2>
            <div className="grid" id={type}>
                {isLoading && <p>Cargando...</p>}
                {error && <p>Error</p>}
                {items &&
                    items.map((combo: Plato, i: number) => (
                        <div className="item" key={i}>
                            <img src="./assets/items/1.png" alt="" />
                            <h3>{combo.nombre}</h3>
                            <span className="precio">${combo.precio}</span>
                            <p>{combo.descripcion}</p>
                        </div>
                    ))}
            </div>
        </section>
    );
};

export const Sections = () => {
    return (
        <div className="sections">
            <Section title="Combos" type="combos" />
            <Section title="Principales" type="principales" />
            <Section title="Postres" type="postres" />
        </div>
    );
};
