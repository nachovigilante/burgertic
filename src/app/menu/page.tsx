const Menu = () => {
    return (
        <>
            <div className="container menu">
                <div className="sections">
                    <section>
                        <h2>Combos</h2>
                        <div className="grid" id="combos"></div>
                    </section>
                    <section>
                        <h2>Principales</h2>
                        <div className="grid" id="principales"></div>
                    </section>
                    <section>
                        <h2>Postres</h2>
                        <div className="grid" id="postres"></div>
                    </section>
                </div>
                <div id="pedido">
                    <h2>Mi pedido</h2>
                    <ul></ul>
                    <button id="enviar">Pedir</button>
                    <div id="total">
                        Total: <span>$</span>
                    </div>
                </div>
            </div>
            <div id="modal">
                <button id="close"></button>
                <div className="item"></div>
                <button id="add">
                    <div className="add-btn"></div>
                    <span>Agregar</span>
                </button>
            </div>
            <div id="modal-background"></div>
        </>
    );
};

export default Menu;
