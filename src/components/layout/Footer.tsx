function SocialMediaLink({ url, icon }: { url: string; icon: string }) {
    return (
        <a
            className="no-underline h-[25px] w-[25px] text-white text-xl"
            href={url}
        >
            <img
                className="h-full w-full object-cover"
                src={icon}
                alt="Social Media Logo"
            />
        </a>
    );
}

function BottomSection() {
    return (
        <div className="flex justify-between items-center pt-5">
            <p className="text-xs font-medium text-white opacity-[0.7]">
                TM © 2023 Burger Tic Corporation. Todos los derechos
                reservados.
            </p>
            <div className="flex items-center gap-6">
                <SocialMediaLink
                    url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                    icon="/assets/facebook.png"
                />
                <SocialMediaLink
                    url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                    icon="/assets/instagram.png"
                />
                <SocialMediaLink
                    url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                    icon="/assets/youtube.png"
                />
                <SocialMediaLink
                    url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                    icon="/assets/twitter.png"
                />
            </div>
        </div>
    );
}

function SiteMapList({
    title,
    links,
}: {
    title: string;
    links: { name: string; url: string }[];
}) {
    return (
        <div className="flex flex-col gap-6 w-[160px]">
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <ul className="flex flex-col gap-[15px] list-none">
                {links.map((link) => (
                    <li key={link.name}>
                        <a
                            className="no-underline text-white text-[15px] font-medium transition-all duration-300 ease-in-out hover:text-[#d72300]"
                            href={link.url}
                        >
                            {link.name}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function TopSection() {
    return (
        <div className="flex justify-between border-b-wwhite pb-8 border-b">
            <h2 className="text-white text-3xl font-bold flex-grow">BURGER TIC.</h2>
            <div className="flex justify-between items-start gap-12">
                <SiteMapList
                    title="Info BT"
                    links={[
                        {
                            name: 'Sobre nosotros',
                            url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                        },
                        {
                            name: 'Contacto',
                            url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                        },
                    ]}
                />
                <SiteMapList
                    title="Otros sitios"
                    links={[
                        {
                            name: 'TIC Cheatsheets',
                            url: 'https://cheatsheets-nachovigilante.vercel.app/',
                        },
                        {
                            name: 'TIC Experience',
                            url: 'https://www.ort.edu.ar/ticexperience/',
                        },
                        {
                            name: 'TIC Website',
                            url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                        },
                    ]}
                />
                <SiteMapList
                    title="My BT"
                    links={[
                        {
                            name: 'Registrarse',
                            url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                        },
                        {
                            name: 'Iniciar sesión',
                            url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                        },
                        {
                            name: 'Mi cuenta',
                            url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                        },
                        {
                            name: 'Política de privacidad',
                            url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                        },
                        {
                            name: 'Defensa de las y los consumidores',
                            url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                        },
                    ]}
                />
            </div>
        </div>
    );
}

export function Footer() {
    return (
        <footer className="bg-[#502314] text-white w-screen py-12 flex justify-center">
            <div className="flex flex-col gap-5 max-w-[1280px] container">
                <TopSection />
                <BottomSection />
            </div>
        </footer>
    );
}
