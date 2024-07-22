export function Novedad({
    title,
    description,
    imageSrc,
}: {
    title: string;
    description: string;
    imageSrc: string;
}) {
    return (
        <div className="flex flex-col gap-4 w-[360px]">
            <img
                className="h-[240px] w-full object-cover rounded-[10px]"
                src={imageSrc}
                alt=""
            />
            <h3 className="text-[23px]">{title}</h3>
            <p className="text-[15px]">{description}</p>
        </div>
    );
}

export function Novedades() {
    return (
        <section className="py-12 px-0 flex flex-col w-screen items-center">
            <div className="w-full max-w-[1280px]">
                <h2 className="text-3xl mb-8">Novedades</h2>
                <div className="flex items-start justify-between">
                    <Novedad
                        title="Descubrí el Reino Digital"
                        description="De la mano de Ivo recorre los sinuosos caminos del Reino Digital. Desde intentar conectar un módulo bluethooth por 2 horas hasta que te enterás que está quemado, hasta conectar una ESP-45 al WiFi de proyecto. Todo eso y mucho más poder hacer en este reino."
                        imageSrc="/assets/digital.png"
                    />
                    <Novedad
                        title="¡Compartí entre 3!"
                        description="Una Milanesa gigante con 3 Empanadas y Papas. El combo que no puede faltar en la pecera. Te podes llevar 2 combos por solo $8.500."
                        imageSrc="/assets/mep.png"
                    />
                    <Novedad
                        title="¡Los que aman grandes y chicos llegaron a BT!"
                        description="8 increíbles juguetes electrónicos acompañan nuestras computadoras nuevas para que puedan disfrutarlos como nadie."
                        imageSrc="/assets/jr.png"
                    />
                </div>
            </div>
        </section>
    );
}
