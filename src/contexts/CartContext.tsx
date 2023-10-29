import React, { ReactNode, createContext, useReducer } from 'react';
import { Product } from '~/components/menu/Sections';

export type Item = {
    id: number;
    name: string;
    price: number;
};

export type CartItem = {
    item: Item;
    quantity: number;
};

type CartContextType = {
    cartItems: CartItem[];
    addItem: (product: Item) => void;
    removeItem: (product: Item) => void;
    resetCart: () => void;
};

const CartContext = createContext({
    cartItems: [],
    addItem: (product: Item) => {},
    removeItem: (product: Item) => {},
    resetCart: () => {},
} as CartContextType);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, dispatch] = useReducer(
        (
            state: CartItem[],
            action: { type: 'add' | 'remove' | 'reset'; product: Item | null },
        ) => {
            switch (action.type) {
                case 'add':
                    const itemToAdd = state.find(
                        (item) => item.item.id === action.product!.id,
                    );
                    return [
                        ...state.filter(
                            (item) => item.item.id !== action.product!.id,
                        ),
                        {
                            item: {
                                id: action.product!.id,
                                price: action.product!.price,
                                name: action.product!.name,
                            },
                            quantity: itemToAdd ? itemToAdd.quantity + 1 : 1,
                        },
                    ];
                case 'remove':
                    const itemToRemove = state.find(
                        (item) => item.item.id === action.product!.id,
                    );
                    if (!itemToRemove) return state;
                    if (itemToRemove.quantity === 1) {
                        return state.filter(
                            (item) => item.item.id !== action.product!.id,
                        );
                    }
                    return state.map((item) =>
                        item.item.id === action.product!.id
                            ? { ...item, quantity: item.quantity - 1 }
                            : item,
                    );
                case 'reset':
                    return [];
            }
        },
        [] as CartItem[],
    );

    const addItem = (product: Item) => {
        dispatch({ type: 'add', product });
    };

    const removeItem = (product: Item) => {
        dispatch({ type: 'remove', product });
    };

    const resetCart = () => {
        dispatch({ type: 'reset', product: null });
    };

    return (
        <CartContext.Provider
            value={{ cartItems, addItem, removeItem, resetCart }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
