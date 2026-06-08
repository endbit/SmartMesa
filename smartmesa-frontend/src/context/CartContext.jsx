import {
    createContext,
    useContext,
    useState,
    useMemo
} from "react";

const CartContext = createContext();

export function CartProvider({ children }) {

    const [items, setItems] = useState([]);

    // ➕ ADICIONAR ITEM
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
                            quantity: item.quantity + 1
                        }
                        : item
                );
            }

            return [
                ...current,
                {
                    id: product.id,
                    productName: product.nome,
                    price: product.preco,
                    quantity: 1
                }
            ];
        });
    }

    // ➖ REMOVER 1 UNIDADE
    function removeItem(productId) {

        setItems(current => {

            const existing = current.find(
                item => item.id === productId
            );

            if (!existing) return current;

            if (existing.quantity === 1) {
                return current.filter(
                    item => item.id !== productId
                );
            }

            return current.map(item =>
                item.id === productId
                    ? {
                        ...item,
                        quantity: item.quantity - 1
                    }
                    : item
            );
        });
    }

    // ❌ REMOVER COMPLETO
    function deleteItem(productId) {

        setItems(current =>
            current.filter(
                item => item.id !== productId
            )
        );
    }

    // 🧹 LIMPAR CARRINHO
    function clearCart() {
        setItems([]);
    }

    // 🔢 TOTAL DE ITENS
    const totalItems = useMemo(() => {
        return items.reduce(
            (acc, item) => acc + item.quantity,
            0
        );
    }, [items]);

    // 💰 TOTAL PREÇO
    const totalPrice = useMemo(() => {
        return items.reduce(
            (acc, item) =>
                acc + (item.price * item.quantity),
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

// 🧠 HOOK
export function useCart() {

    const context = useContext(CartContext);

    if (!context) {
        throw new Error(
            "useCart deve ser usado dentro do CartProvider"
        );
    }

    return context;
}