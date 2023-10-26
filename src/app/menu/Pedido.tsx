type Producto = {
    name: string;
    price: number;
};

const PedidoItem = ({
    producto,
    cantidad,
}: {
    producto: Producto;
    cantidad: number;
}) => {
    return (
        <li className="item" data-id="${item.id}">
            <div className="info">
                <h3>{producto.name}</h3>
                <p className="precio">${producto.price}</p>
            </div>
            <div className="control">
                <button className="remove-one">
                    {cantidad > 1 ? (
                        <div className="remove-btn"></div>
                    ) : (
                        <div className="delete-btn"></div>
                    )}
                </button>
                <p className="cantidad">3</p>
                <button className="add-one">
                    <div className="add-btn"></div>
                </button>
            </div>
        </li>
    );
};

export const Pedido = () => {
    return (
        <div id="pedido">
            <h2>Mi pedido</h2>
            <ul>
                <PedidoItem
                    producto={{
                        name: 'Combo Ivo',
                        price: 3000,
                    }}
                    cantidad={3}
                />
                <PedidoItem
                    producto={{
                        name: 'Combo Ivo',
                        price: 3000,
                    }}
                    cantidad={3}
                />
                <PedidoItem
                    producto={{
                        name: 'Combo Ivo',
                        price: 3000,
                    }}
                    cantidad={3}
                />
            </ul>
            <button id="enviar" className="active">
                Pedir
            </button>
            <div id="total">
                Total: <span>$</span>
            </div>
        </div>
    );
};
