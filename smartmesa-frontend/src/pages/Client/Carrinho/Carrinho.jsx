import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

export default function Carrinho() {
    const items = [
        {
            id: 1,
            nome: "Coxinha",
            descricao: "Frango com catupiry",
            preco: 7.9,
            quantidade: 2,
            imagem:
                "https://images.unsplash.com/photo-1601050690597-df0568f70950",
        },
        {
            id: 2,
            nome: "Pastel",
            descricao: "Carne ou queijo",
            preco: 9.9,
            quantidade: 1,
            imagem:
                "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec",
        },
    ];

    const subtotal = items.reduce(
        (acc, item) => acc + item.preco * item.quantidade,
        0
    );

    const taxa = subtotal * 0.1;
    const total = subtotal + taxa;

    return (
        <div className="min-h-screen bg-linear-to-br from-zinc-950 via-stone-900 to-neutral-950 pb-44">

            {/* HEADER */}
            <div className="sticky top-0 z-40 backdrop-blur-xl bg-stone-950/70 border-b border-stone-800 px-4 py-4">
                <h1 className="text-amber-100 text-xl font-bold tracking-tight flex items-center gap-2">
                    <ShoppingBag size={18} className="text-amber-400" />
                    Seu Pedido
                </h1>

                <p className="text-stone-400 text-sm mt-1">
                    Mesa ativa • SmartMesa 🍷
                </p>
            </div>

            {/* LISTA */}
            <div className="px-4 mt-5 space-y-4">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="bg-stone-900/70 backdrop-blur-xl rounded-3xl overflow-hidden border border-stone-800 shadow-xl"
                    >
                        <div className="flex">

                            {/* imagem */}
                            <img
                                src={item.imagem}
                                className="w-24 h-24 object-cover"
                                alt={item.nome}
                            />

                            <div className="flex-1 p-4">

                                {/* topo */}
                                <div className="flex justify-between gap-3">
                                    <div>
                                        <h3 className="text-amber-100 font-semibold">
                                            {item.nome}
                                        </h3>

                                        <p className="text-stone-400 text-sm">
                                            {item.descricao}
                                        </p>
                                    </div>

                                    <button className="text-stone-500 hover:text-red-400 transition">
                                        <Trash2 size={18} />
                                    </button>
                                </div>

                                {/* quantidade + preço */}
                                <div className="flex items-center justify-between mt-4">

                                    <div className="flex items-center gap-3">

                                        <button className="w-9 h-9 rounded-xl bg-stone-800 border border-stone-700 flex items-center justify-center text-amber-200">
                                            <Minus size={16} />
                                        </button>

                                        <span className="text-amber-50 font-medium">
                                            {item.quantidade}
                                        </span>

                                        <button className="w-9 h-9 rounded-xl bg-stone-800 border border-stone-700 flex items-center justify-center text-amber-200">
                                            <Plus size={16} />
                                        </button>

                                    </div>

                                    <span className="text-amber-400 font-bold">
                                        R$ {(item.preco * item.quantidade).toFixed(2)}
                                    </span>
                                </div>

                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* RESUMO FIXO */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-stone-950/80 backdrop-blur-xl border-t border-stone-800">

                <div className="bg-stone-900/70 rounded-3xl p-4 mb-3 border border-stone-800">

                    <div className="flex justify-between text-stone-400 text-sm">
                        <span>Subtotal</span>
                        <span>R$ {subtotal.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-stone-400 text-sm mt-1">
                        <span>Taxa de serviço</span>
                        <span>R$ {taxa.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-amber-100 font-bold text-lg mt-3 pt-3 border-t border-stone-800">
                        <span>Total</span>
                        <span>R$ {total.toFixed(2)}</span>
                    </div>

                </div>

                <button className="w-full h-14 rounded-2xl bg-linear-to-r from-amber-500 to-red-500 text-black font-bold flex items-center justify-between px-5 shadow-xl active:scale-[0.98] transition">

                    <span>Finalizar pedido</span>

                    <span className="font-bold">
                        R$ {total.toFixed(2)}
                    </span>

                </button>

            </div>
        </div>
    );
}