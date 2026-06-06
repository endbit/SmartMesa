import { useEffect, useState } from "react";
import getProducts from "./services";


import {
    Package,
    Tags,
    Plus,
    Search,
    Pencil,
    Trash2,
} from "lucide-react";

export default function Products() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function loadProducts() {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (error) {
                console.error("Erro ao carregar produtos:", error);
            }
        }

        loadProducts();
    }, []);

    return (
        <div className="space-y-8">

            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">
                        Produtos
                    </h1>

                    <p className="text-zinc-400 mt-2">
                        Gerencie produtos e categorias do cardápio.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                {/* FORM */}
                <div className="space-y-6">

                    <div className="bg-white/3 border border-white/10 rounded-3xl p-6">

                        <div className="flex items-center gap-3 mb-6">
                            <Package className="text-orange-400" />
                            <h2 className="text-xl font-bold text-white">
                                Novo Produto
                            </h2>
                        </div>

                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Nome"
                                className="w-full mt-2 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white"
                            />

                            <select className="w-full mt-2 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white">
                                <option>Salgados</option>
                                <option>Bebidas</option>
                            </select>

                            <input
                                type="number"
                                placeholder="Preço"
                                className="w-full mt-2 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white"
                            />

                            <textarea
                                rows="4"
                                placeholder="Descrição"
                                className="w-full mt-2 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white resize-none"
                            />

                            <input
                                type="file"
                                className="w-full mt-2 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-zinc-400"
                            />

                            <button className="w-full bg-orange-500 hover:bg-orange-400 transition py-3 rounded-2xl text-white font-semibold">
                                Salvar Produto
                            </button>
                        </div>

                    </div>

                </div>

                {/* LISTAGEM */}
                <div className="xl:col-span-2 bg-white/3 border border-white/10 rounded-3xl p-6">

                    <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between mb-6">

                        <div>
                            <h2 className="text-xl font-bold text-white">
                                Produtos Cadastrados
                            </h2>
                            <p className="text-zinc-400 text-sm mt-1">
                                Gerencie os itens do cardápio.
                            </p>
                        </div>

                        <div className="relative">
                            <Search
                                size={18}
                                className="absolute left-4 top-3.5 text-zinc-500"
                            />

                            <input
                                type="text"
                                placeholder="Pesquisar..."
                                className="bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 py-3 text-white"
                            />
                        </div>

                    </div>

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="text-left py-4 text-zinc-400">
                                        Produto
                                    </th>
                                    <th className="text-left py-4 text-zinc-400">
                                        Categoria
                                    </th>
                                    <th className="text-left py-4 text-zinc-400">
                                        Preço
                                    </th>
                                    <th className="text-left py-4 text-zinc-400">
                                        Estoque
                                    </th>
                                    <th className="text-right py-4 text-zinc-400">
                                        Ações
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {products.map((product) => (
                                    <tr
                                        key={product.id}
                                        className="border-b border-white/5"
                                    >

                                        {/* 🔥 PRODUTO COM IMAGEM */}
                                        <td className="py-4 text-white flex items-center gap-3">

                                            <img
                                                src={product.imageUrl || "https://via.placeholder.com/40"}
                                                alt={product.nome}
                                                className="w-10 h-10 rounded-xl object-cover border border-white/10"
                                            />

                                            {product.nome}
                                        </td>

                                        <td className="py-4 text-zinc-400">
                                            {product.category?.nome}
                                        </td>

                                        <td className="py-4 text-zinc-400">
                                            R$ {product.preco}
                                        </td>

                                        <td className="py-4">
                                            <span className="px-3 py-1 rounded-xl bg-green-500/10 text-green-400 text-sm">
                                                {product.estoque || 0}
                                            </span>
                                        </td>

                                        <td className="py-4">
                                            <div className="flex justify-end gap-2">

                                                <button className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-300">
                                                    <Pencil size={18} />
                                                </button>

                                                <button className="w-10 h-10 rounded-xl bg-red-500/10 hover:bg-red-500/20 flex items-center justify-center text-red-400">
                                                    <Trash2 size={18} />
                                                </button>

                                            </div>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>

                        </table>

                    </div>

                    {/* CATEGORIAS */}
                    <div className="mt-10">
                        <h3 className="text-lg font-semibold text-white mb-4">
                            Categorias Cadastradas
                        </h3>

                        <div className="flex flex-wrap gap-3">
                            {["Salgados", "Bebidas", "Doces", "Combos"].map((cat, i) => (
                                <div
                                    key={i}
                                    className="px-4 py-2 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-400"
                                >
                                    {cat}
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}