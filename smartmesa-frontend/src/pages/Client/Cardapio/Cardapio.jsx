import { Search, Plus, ShoppingBag } from "lucide-react";
import { useParams, useLocation } from "react-router-dom";

export default function Cardapio() {
    const { tableId } = useParams();
    const location = useLocation();

    const name = location.state?.name || "Cliente";

    const products = [
        {
            id: 1,
            nome: "Coxinha",
            descricao: "Frango com catupiry cremoso",
            preco: 7.9,
            imagem:
                "https://images.unsplash.com/photo-1601050690597-df0568f70950",
        },
        {
            id: 2,
            nome: "Pastel",
            descricao: "Carne ou queijo artesanal",
            preco: 9.9,
            imagem:
                "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-stone-900 to-neutral-950 pb-32">

            {/* HEADER */}
            <div className="sticky top-0 z-40 backdrop-blur-xl bg-stone-950/70 border-b border-stone-800 px-4 py-4">
                <h1 className="text-amber-100 text-xl font-bold tracking-tight">
                    SmartMesa 🍷
                </h1>

                <p className="text-stone-400 text-sm mt-1">
                    Mesa #{tableId} • Bem-vindo, {name}
                </p>
            </div>

            {/* SEARCH */}
            <div className="p-4">
                <div className="relative">
                    <Search
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500"
                    />

                    <input
                        placeholder="Buscar pratos, bebidas..."
                        className="w-full h-14 pl-12 pr-4 rounded-2xl bg-stone-900/60 border border-stone-700 text-amber-50 outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-500/10 transition"
                    />
                </div>
            </div>

            {/* CATEGORIAS */}
            <div className="flex gap-3 overflow-x-auto px-4 pb-4">
                <button className="px-5 py-2 rounded-full bg-gradient-to-r from-amber-500 to-red-500 text-black font-semibold whitespace-nowrap">
                    🍟 Salgados
                </button>

                <button className="px-5 py-2 rounded-full bg-stone-900 text-stone-300 border border-stone-700 whitespace-nowrap">
                    🥤 Bebidas
                </button>

                <button className="px-5 py-2 rounded-full bg-stone-900 text-stone-300 border border-stone-700 whitespace-nowrap">
                    🍔 Lanches
                </button>
            </div>

            {/* PRODUTOS */}
            <div className="px-4 space-y-5">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="bg-stone-900/70 backdrop-blur-xl rounded-3xl overflow-hidden border border-stone-800 shadow-xl"
                    >
                        <img
                            src={product.imagem}
                            alt={product.nome}
                            className="w-full h-44 object-cover"
                        />

                        <div className="p-4">
                            <h3 className="text-amber-100 font-semibold text-lg">
                                {product.nome}
                            </h3>

                            <p className="text-stone-400 text-sm mt-1">
                                {product.descricao}
                            </p>

                            <div className="flex items-center justify-between mt-5">
                                <span className="text-amber-400 font-bold text-lg">
                                    R$ {product.preco.toFixed(2)}
                                </span>

                                <button className="w-12 h-12 rounded-2xl bg-gradient-to-r from-amber-500 to-red-500 flex items-center justify-center shadow-lg active:scale-95 transition">
                                    <Plus size={20} className="text-black" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* CARRINHO FIXO */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-stone-950/80 backdrop-blur-xl border-t border-stone-800">
                <button className="w-full h-14 rounded-2xl bg-gradient-to-r from-amber-500 to-red-500 text-black font-bold flex items-center justify-between px-5 shadow-xl">

                    <div className="flex items-center gap-2">
                        <ShoppingBag size={18} />
                        <span>3 itens</span>
                    </div>

                    <span>R$ 27,00</span>

                    <span className="font-semibold">Ver pedido →</span>
                </button>
            </div>
        </div>
    );
}