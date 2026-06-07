import { Plus } from "lucide-react";

export default function ProductCard({ product, onAdd }) {
    return (
        <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl p-4">

            {/* LEFT: imagem + info */}
            <div className="flex items-center gap-4">

                {/* 🔥 IMAGEM */}
                <img
                    src={
                        product.imageUrl ||
                        "https://via.placeholder.com/80"
                    }
                    alt={product.nome}
                    className="w-14 h-14 rounded-xl object-cover border border-white/10"
                />

                {/* INFO */}
                <div>
                    <h3 className="text-white font-semibold">
                        {product.nome}
                    </h3>

                    <p className="text-zinc-400 text-sm">
                        {product.category?.nome}
                    </p>

                    <span className="text-orange-400 font-bold">
                        R$ {product.preco}
                    </span>
                </div>
            </div>

            {/* RIGHT: botão */}
            <button
                onClick={() => onAdd(product)}
                className="bg-orange-500 hover:bg-orange-400 text-white px-4 py-2 rounded-xl transition"
            >
                Adicionar
            </button>

        </div>
    );
}