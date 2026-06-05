import { ShoppingBag } from "lucide-react";

export default function CartButton({
    totalItems,
    totalPrice,
    onClick
}) {
    return (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-stone-950/80 backdrop-blur-xl border-t border-stone-800">

            <button
                onClick={onClick}
                className="w-full h-14 rounded-2xl bg-linear-to-r from-amber-500 to-red-500 text-black font-bold flex items-center justify-between px-5"
            >

                <div className="flex items-center gap-2">
                    <ShoppingBag size={18} />
                    <span>{totalItems} itens</span>
                </div>

                <span>
                    R$ {totalPrice.toFixed(2)}
                </span>

                <span>
                    Ver pedido →
                </span>

            </button>

        </div>
    );
}