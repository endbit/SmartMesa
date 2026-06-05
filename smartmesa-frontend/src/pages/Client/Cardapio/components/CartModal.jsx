import { X, Minus, Plus, ShoppingBag } from "lucide-react";

import { useCart } from "../../../../context/CartContext";

export default function CartModal({
    open,
    onClose
}) {

    const {
        items,
        totalPrice,
        addItem,
        removeItem
    } = useCart();

    if (!open) return null;

    return (
        <>
            {/* Overlay */}
            <div
                onClick={onClose}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            {/* Bottom Sheet */}
            <div className="fixed bottom-0 left-0 right-0 z-50 bg-stone-950 border-t border-stone-800 rounded-t-3xl max-h-[85vh] flex flex-col animate-in slide-in-from-bottom duration-300">

                {/* Handle */}
                <div className="flex justify-center py-3">
                    <div className="w-14 h-1.5 rounded-full bg-stone-700" />
                </div>

                {/* Header */}
                <div className="flex items-center justify-between px-5 pb-4 border-b border-stone-800">

                    <div className="flex items-center gap-3">

                        <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                            <ShoppingBag
                                size={18}
                                className="text-amber-400"
                            />
                        </div>

                        <div>
                            <h2 className="text-white font-bold text-lg">
                                Seu Pedido
                            </h2>

                            <p className="text-stone-400 text-sm">
                                {items.length} itens
                            </p>
                        </div>

                    </div>

                    <button
                        onClick={onClose}
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-stone-900"
                    >
                        <X size={18} className="text-white" />
                    </button>

                </div>

                {/* Lista */}
                <div className="flex-1 overflow-y-auto p-5 space-y-4">

                    {items.length === 0 && (
                        <div className="text-center py-10">

                            <ShoppingBag
                                size={40}
                                className="mx-auto text-stone-600"
                            />

                            <p className="text-stone-400 mt-4">
                                Seu carrinho está vazio
                            </p>

                        </div>
                    )}

                    {items.map(item => (

                        <div
                            key={item.id}
                            className="bg-stone-900 rounded-2xl p-4 border border-stone-800"
                        >

                            <div className="flex justify-between items-start">

                                <div>

                                    <h3 className="text-white font-semibold">
                                        {item.nome}
                                    </h3>

                                    <p className="text-amber-400 font-bold mt-1">
                                        R$ {item.preco.toFixed(2)}
                                    </p>

                                </div>

                                <div className="flex items-center gap-3">

                                    <button
                                        onClick={() =>
                                            removeItem(item.id)
                                        }
                                        className="w-9 h-9 rounded-xl bg-stone-800 flex items-center justify-center"
                                    >
                                        <Minus
                                            size={16}
                                            className="text-white"
                                        />
                                    </button>

                                    <span className="text-white font-semibold min-w-5 text-center">
                                        {item.quantity}
                                    </span>

                                    <button
                                        onClick={() =>
                                            addItem(item)
                                        }
                                        className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center"
                                    >
                                        <Plus
                                            size={16}
                                            className="text-black"
                                        />
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

                {/* Footer */}
                <div className="border-t border-stone-800 p-5 bg-stone-950">

                    <div className="flex justify-between text-white mb-4">

                        <span>Total</span>

                        <span className="font-bold text-xl text-amber-400">
                            R$ {totalPrice.toFixed(2)}
                        </span>

                    </div>

                    <button
                        disabled={!items.length}
                        className="w-full h-14 rounded-2xl bg-linear-to-r from-amber-500 to-red-500 text-black font-bold disabled:opacity-40"
                    >
                        Finalizar Pedido 🍽️
                    </button>

                </div>

            </div>
        </>
    );
}