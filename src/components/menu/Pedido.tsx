import useCart from '~/hooks/useCart';
import { CartItem } from '~/contexts/CartContext';

const PedidoItem = ({ product: { item, quantity } }: { product: CartItem }) => {
    const { addItem, removeItem } = useCart();

    return (
        <li className="item" data-id="${item.id}">
            <div className="info">
                <h3>{item.name}</h3>
                <p className="precio">${item.price}</p>
            </div>
            <div className="control">
                <button className="remove-one" onClick={() => removeItem(item)}>
                    {quantity > 1 ? (
                        <div className="remove-btn" />
                    ) : (
                        <div className="delete-btn" />
                    )}
                </button>
                <p className="cantidad">{quantity}</p>
                <button className="add-one" onClick={() => addItem(item)}>
                    <div className="add-btn" />
                </button>
            </div>
        </li>
    );
};

export const Pedido = () => {
    const { cartItems } = useCart();

    return (
        <div id="pedido">
            <h2>Mi pedido</h2>

            <ul>
                {cartItems.length === 0 && (
                    <p className="empty">Todavía no agregaste nada :(</p>
                )}
                {cartItems.map((item, i) => (
                    <PedidoItem key={i} product={item} />
                ))}
            </ul>
            {cartItems.length > 0 && (
                <button id="enviar" className="active">
                    Pedir
                </button>
            )}
            <div id="total">
                Total: <span>$</span>
            </div>
        </div>
    );
};
