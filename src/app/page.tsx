export default function Home() {
    return (
        <>
            <div className="carrousel">
                <div className="slider-container">
                    <div className="slide">
                        <img src="./assets/slider/slide1.jpeg" alt="" />
                    </div>
                    <div className="slide">
                        <img src="./assets/slider/slide2.jpeg" alt="" />
                    </div>
                    <div className="slide">
                        <img src="./assets/slider/slide3.jpeg" alt="" />
                    </div>
                    <div className="slide">
                        <img src="./assets/slider/slide4.png" alt="" />
                    </div>
                    <div className="slide">
                        <img src="./assets/slider/slide5.jpg" alt="" />
                    </div>
                    <div className="slide">
                        <img src="./assets/slider/slide6.png" alt="" />
                    </div>
                    <div className="slide">
                        <img src="./assets/slider/slide7.png" alt="" />
                    </div>
                </div>
            </div>
            <div className="carrousel-overlay">
                <div className="carrousel-controls">
                    <button id="prev">{`<`}</button>
                    <div id="bullets"></div>
                    <button id="next">{'>'}</button>
                </div>
            </div>
            <section className="novedades">
                <div className="w-full max-w-[1280px]">
                    <h2>Novedades</h2>
                    <div className="novedades-container">
                        <div className="novedad">
                            <img src="./assets/digital.png" alt="" />
                            <h3>Descubrí el Reino Digital</h3>
                            <p>
                                De la mano de Ivo recorre los sinuosos caminos
                                del Reino Digital. Desde intentar conectar un
                                módulo bluethooth por 2 horas hasta que te
                                enterás que está quemado, hasta conectar una
                                ESP-45 al WiFi de proyecto. Todo eso y mucho más
                                poder hacer en este reino.
                            </p>
                        </div>
                        <div className="novedad">
                            <img src="./assets/mep.png" alt="" />
                            <h3>¡Compartí entre 3!</h3>
                            <p>
                                Una <b>M</b>ilanesa gigante con 3 <b>E</b>
                                mpanadas y <b>P</b>apas. El combo que no puede
                                faltar en la pecera. Te podes llevar 2 combos
                                por solo $8.500.
                            </p>
                        </div>
                        <div className="novedad">
                            <img src="" alt="" />
                            <h3>
                                ¡Los que aman grandes y chicos llegaron a BK!
                            </h3>
                            <p>
                                8 increíbles juguetes de Warner acompañan
                                nuestras cajitas mágicas para que vos o tus
                                peques puedan disfrutarlos como nadie.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="footer">
                <div className="container">
                    <div className="top">
                        <div className="footer-logo">BURGER TIC.</div>
                        <div className="sitemap">
                            <div className="sitemap-list">
                                <h3>Info BT</h3>
                                <ul>
                                    <li>
                                        <a href="./menu.html">Menú</a>
                                    </li>
                                    <li>
                                        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                                            Sobre nosotros
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                                            Contacto
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="sitemap-list">
                                <h3>Otros sitios</h3>
                                <ul>
                                    <li>
                                        <a href="https://cheatsheets-nachovigilante.vercel.app/">
                                            TIC Cheatsheets
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.ort.edu.ar/ticexperience/">
                                            TIC Experience
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                                            TIC Website
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="sitemap-list">
                                <h3>My BT</h3>
                                <ul>
                                    <li>
                                        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                                            Registrarse
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                                            Iniciar sesión
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                                            Mi cuenta
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                                            Política de privacidad
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                                            Defensa de las y los consumidores
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="bottom">
                        <p>
                            TM © 2023 Burger Tic Corporation. Todos los
                            derechos reservados.
                        </p>
                        <div className="social-media">
                            <a href="">
                                <img src="./assets/facebook.png" alt="" />
                            </a>
                            <a href="">
                                <img src="./assets/instagram.png" alt="" />
                            </a>
                            <a href="">
                                <img src="./assets/youtube.png" alt="" />
                            </a>
                            <a href="">
                                <img src="./assets/twitter.png" alt="" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
