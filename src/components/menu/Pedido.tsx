import useCart from '~/hooks/useCart';
import { CartItem } from '~/contexts/CartContext';
import useOrders from '~/hooks/useOrders';

const PedidoItem = ({ product: { item, quantity } }: { product: CartItem }) => {
    const { addItem, removeItem } = useCart();

    return (
        <li
            className="flex justify-between items-center py-2.5 px-0 border-b border-b-[#e2e2e2] last:border-b-0"
            data-id="${item.id}"
        >
            <div className="flex flex-col justify-center h-full">
                <h3 className="text-[15px] font-bold">{item.name}</h3>
                <p className="text-[15px] font-medium text-[#d72300] mb-2.5">
                    ${item.price}
                </p>
            </div>
            <div className="flex gap-2.5 items-center">
                <button
                    className="remove-one h-[30px] w-[30px]"
                    onClick={() => removeItem(item)}
                >
                    {quantity > 1 ? (
                        <div className="btn-logo remove-btn mt-3" />
                    ) : (
                        <div className="btn-logo delete-btn" />
                    )}
                </button>
                <p className="text-xl font-bold text-center overflow-hidden min-w-[30px]">
                    {quantity}
                </p>
                <button
                    className="add-one h-[30px] w-[30px]"
                    onClick={() => addItem(item)}
                >
                    <div className="btn-logo add-btn" />
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
        <div
            id="pedido"
            className="box w-[500px] max-h-[500px] min-h-[350px] p-6 flex flex-col transition-all duration-300 ease-in-out mt-[97px] sticky top-[30px]"
        >
            <h2 className="mb-5 text-xl">Mi pedido</h2>
            <ul className="list-none flex flex-col h-full overflow-y-auto">
                {cartItems.length === 0 && (
                    <p className="flex justify-center items-center flex-col h-full text-xl gap-5">
                        Todavía no agregaste nada :(
                    </p>
                )}
                {cartItems.map((item, i) => (
                    <PedidoItem key={i} product={item} />
                ))}
            </ul>
            {cartItems.length > 0 && (
                <>
                    <div
                        id="total"
                        className="text-xl font-bold mt-5 justify-between items-center h-[44px] flex mb-3"
                    >
                        Total:{' '}
                        <span className="text-xl font-medium">
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
                        className="items-center p-0 text-xl py-2 flex"
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
                            <p>
                                Error al enviar el pedido:{' '}
                                {placeOrderError.message}
                            </p>
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
