import { X, Plus } from "lucide-react";

export default function ProductModal({ product, open, onClose, onAdd }) {
    if (!open || !product) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

            {/* 🌑 overlay */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* 📦 modal */}
            <div className="relative w-[92%] max-w-md bg-zinc-900 rounded-2xl overflow-hidden shadow-2xl animate-fade-in">

                {/* ❌ fechar */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 bg-black/60 p-2 rounded-full text-white z-10"
                >
                    <X size={18} />
                </button>

                {/* 🖼️ imagem */}
                <img
                    src={product.imageUrl || "https://via.placeholder.com/300"}
                    className="w-full h-52 object-cover"
                />

                {/* 📄 conteúdo */}
                <div className="p-4 flex flex-col gap-3">

                    <h2 className="text-white text-xl font-bold">
                        {product.nome}
                    </h2>

                    <span className="text-orange-400 text-lg font-bold">
                        R$ {Number(product.preco).toFixed(2)}
                    </span>

                    <p className="text-zinc-300 text-sm leading-relaxed">
                        {product.descricao || "Sem descrição disponível."}
                    </p>

                    <button
                        onClick={() => onAdd(product)}
                        className="mt-2 w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-semibold py-3 rounded-xl transition"
                    >
                        <Plus size={18} />
                        Adicionar ao carrinho
                    </button>

                </div>
            </div>
        </div>
    );
}