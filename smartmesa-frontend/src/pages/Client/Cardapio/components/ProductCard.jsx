import { Plus } from "lucide-react";

export default function ProductCard({
    product,
    onAdd
}) {
    return (
        <div className="bg-stone-900/70 backdrop-blur-xl rounded-3xl overflow-hidden border border-stone-800 shadow-xl">

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

                    <button
                        onClick={() => onAdd(product)}
                        className="w-12 h-12 rounded-2xl bg-linear-to-r from-amber-500 to-red-500 flex items-center justify-center"
                    >
                        <Plus size={20} className="text-black" />
                    </button>

                </div>

            </div>

        </div>
    );
}