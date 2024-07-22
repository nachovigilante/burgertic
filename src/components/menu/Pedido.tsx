import useCart from '~/hooks/useCart';
import { CartItem } from '~/contexts/CartContext';
import useOrders from '~/hooks/useOrders';

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
    const { cartItems, resetCart } = useCart();
    const {
        placeOrder,
        placeOrderPending,
        placeOrderError,
        placeOrderSuccess,
        placeOrderReset,
    } = useOrders();

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
                <>
                    <div id="total" className="active mb-3">
                        Total:{' '}
                        <span>
                            $
                            {cartItems.reduce(
                                (acc, { item, quantity }) =>
                                    acc + item.price * quantity,
                                0,
                            )}
                        </span>
                    </div>
                    <button
                        id="enviar"
                        className="active flex items-center p-0"
                        onClick={async () => placeOrder(cartItems)}
                    >
                        Pedir
                    </button>
                </>
            )}
            {(placeOrderPending || placeOrderSuccess || placeOrderError) && (
                <div className="absolute w-full h-full bg-white -ml-[25px] -mt-[25px] rounded-[10px] flex flex-col gap-3 justify-center items-center">
                    <div className="flex justify-center items-center flex-grow text-2xl">
                        {placeOrderPending && <p>Enviando pedido...</p>}
                        {placeOrderSuccess && <p>Pedido enviado!</p>}
                        {placeOrderError && (
                            <p>Error al enviar el pedido: {placeOrderError.message}</p>
                        )}
                    </div>
                    <button
                        className="text-white bg-primary w-fit rounded-md py-2 px-5 mt-[250px] absolute"
                        onClick={() => {
                            resetCart();
                            placeOrderReset();
                        }}
                    >
                        Hacer otro pedido
                    </button>
                </div>
            )}
        </div>
    );
};
