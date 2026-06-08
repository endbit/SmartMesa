import { Plus } from "lucide-react";

export default function ProductCard({ product, onAdd, onClick }) {
    return (
        <div
            onClick={onClick}
            className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition flex flex-col h-85 cursor-pointer"
        >

            {/* 🖼️ IMAGEM TOPO */}
            <div className="relative w-full h-36 shrink-0">

                <img
                    src={product.imageUrl || "https://via.placeholder.com/300"}
                    alt={product.nome}
                    className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/20" />

                <div className="absolute top-3 left-3">
                    <span className="bg-black/60 text-white text-xs px-2 py-1 rounded-full backdrop-blur">
                        {product.category?.nome}
                    </span>
                </div>
            </div>

            {/* 📄 CONTEÚDO */}
            <div className="flex flex-col gap-2 p-3 flex-1">

                <h3 className="text-white font-semibold leading-tight line-clamp-2">
                    {product.nome}
                </h3>

                {product.descricao && (
                    <p className="text-zinc-400 text-sm line-clamp-2">
                        {product.descricao}
                    </p>
                )}

                <span className="text-orange-400 font-bold text-lg mt-auto">
                    R$ {Number(product.preco).toFixed(2)}
                </span>
            </div>

            {/* ➕ BOTÃO */}
            <div className="p-3 pt-0 mt-auto">
                <button
                    onClick={(e) => {
                        e.stopPropagation(); // 🔥 EVITA abrir modal
                        onAdd(product);
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-medium py-2 rounded-xl transition"
                >
                    <Plus size={18} />
                    Adicionar
                </button>
            </div>

        </div>
    );
}