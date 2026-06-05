import {
    createContext,
    useContext,
    useState,
    useMemo
} from "react";

const CartContext = createContext();

export function CartProvider({ children }) {

    const [items, setItems] = useState([]);

    function addItem(product) {

        setItems(current => {

            const existing = current.find(
                item => item.id === product.id
            );

            if (existing) {

                return current.map(item =>
                    item.id === product.id
                        ? {
                            ...item,
                            quantity:
                                item.quantity + 1
                        }
                        : item
                );
            }

            return [
                ...current,
                {
                    ...product,
                    quantity: 1
                }
            ];
        });
    }

    function removeItem(productId) {

        setItems(current => {

            const existing = current.find(
                item => item.id === productId
            );

            if (!existing) {
                return current;
            }

            if (existing.quantity === 1) {

                return current.filter(
                    item => item.id !== productId
                );
            }

            return current.map(item =>
                item.id === productId
                    ? {
                        ...item,
                        quantity:
                            item.quantity - 1
                    }
                    : item
            );
        });
    }

    function deleteItem(productId) {

        setItems(current =>
            current.filter(
                item => item.id !== productId
            )
        );
    }

    function clearCart() {
        setItems([]);
    }

    const totalItems = useMemo(() => {

        return items.reduce(
            (acc, item) =>
                acc + item.quantity,
            0
        );

    }, [items]);

    const totalPrice = useMemo(() => {

        return items.reduce(
            (acc, item) =>
                acc +
                item.preco *
                item.quantity,
            0
        );

    }, [items]);

    return (
        <CartContext.Provider
            value={{
                items,
                totalItems,
                totalPrice,

                addItem,
                removeItem,
                deleteItem,
                clearCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {

    const context =
        useContext(CartContext);

    if (!context) {

        throw new Error(
            "useCart deve ser usado dentro do CartProvider"
        );
    }

    return context;
}