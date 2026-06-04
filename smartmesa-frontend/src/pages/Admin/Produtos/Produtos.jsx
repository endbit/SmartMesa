import { useState } from "react";
import {
    Package,
    Tags,
    Plus,
    Search,
    Pencil,
    Trash2,
} from "lucide-react";

export default function Products() {

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

                <button className="bg-orange-500 hover:bg-orange-400 transition px-6 py-3 rounded-2xl text-white font-semibold flex items-center gap-2">
                    <Plus size={18} />
                    Novo Produto
                </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-3">
                <p
                    className={`px-5 py-3 rounded-2xl font-medium transition bg-orange-500 text-white`}>
                    Produtos
                </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Formulários */}
                <div className="space-y-6">
                    {/* Cadastro Produto */}
                    <div className="bg-white/3 border border-white/10 rounded-3xl p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <Package className="text-orange-400" />

                            <h2 className="text-xl font-bold text-white">
                                Novo Produto
                            </h2>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-zinc-400 text-sm">
                                    Nome
                                </label>

                                <input
                                    type="text"
                                    placeholder="Ex: Coxinha"
                                    className="w-full mt-2 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white outline-none focus:border-orange-500"
                                />
                            </div>

                            <div>
                                <label className="text-zinc-400 text-sm">
                                    Categoria
                                </label>

                                <select className="w-full mt-2 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white outline-none focus:border-orange-500">
                                    <option>Salgados</option>
                                    <option>Bebidas</option>
                                </select>
                            </div>

                            <div>
                                <label className="text-zinc-400 text-sm">
                                    Preço
                                </label>

                                <input
                                    type="number"
                                    placeholder="1.00"
                                    className="w-full mt-2 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white outline-none focus:border-orange-500"
                                />
                            </div>

                            <div>
                                <label className="text-zinc-400 text-sm">
                                    Estoque
                                </label>

                                <input
                                    type="number"
                                    placeholder="100"
                                    className="w-full mt-2 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white outline-none focus:border-orange-500"
                                />
                            </div>

                            <div>
                                <label className="text-zinc-400 text-sm">
                                    Descrição
                                </label>

                                <textarea
                                    rows="4"
                                    placeholder="Descrição do produto..."
                                    className="w-full mt-2 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white outline-none focus:border-orange-500 resize-none"
                                />
                            </div>

                            <div>
                                <label className="text-zinc-400 text-sm">
                                    Imagem
                                </label>

                                <input
                                    type="file"
                                    className="w-full mt-2 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-zinc-400"
                                />
                            </div>

                            <button className="w-full bg-orange-500 hover:bg-orange-400 transition py-3 rounded-2xl text-white font-semibold">
                                Salvar Produto
                            </button>
                        </div>
                    </div>

                </div>

                {/* Listagem */}
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
                                className="bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 py-3 text-white outline-none focus:border-orange-500"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="text-left py-4 text-zinc-400 font-medium">
                                        Produto
                                    </th>

                                    <th className="text-left py-4 text-zinc-400 font-medium">
                                        Categoria
                                    </th>

                                    <th className="text-left py-4 text-zinc-400 font-medium">
                                        Preço
                                    </th>

                                    <th className="text-left py-4 text-zinc-400 font-medium">
                                        Estoque
                                    </th>

                                    <th className="text-right py-4 text-zinc-400 font-medium">
                                        Ações
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {[
                                    {
                                        nome: "Coxinha",
                                        categoria: "Salgados",
                                        preco: "R$ 1,00",
                                        estoque: 120,
                                    },
                                    {
                                        nome: "Pastel",
                                        categoria: "Salgados",
                                        preco: "R$ 1,00",
                                        estoque: 85,
                                    },
                                    {
                                        nome: "Café Preto",
                                        categoria: "Bebidas",
                                        preco: "R$ 1,00",
                                        estoque: 40,
                                    },
                                ].map((product, index) => (
                                    <tr
                                        key={index}
                                        className="border-b border-white/5"
                                    >
                                        <td className="py-4 text-white">
                                            {product.nome}
                                        </td>

                                        <td className="py-4 text-zinc-400">
                                            {product.categoria}
                                        </td>

                                        <td className="py-4 text-zinc-400">
                                            {product.preco}
                                        </td>

                                        <td className="py-4">
                                            <span className="px-3 py-1 rounded-xl bg-green-500/10 text-green-400 text-sm">
                                                {product.estoque}
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

                    {/* Categorias */}
                    <div className="mt-10">
                        <h3 className="text-lg font-semibold text-white mb-4">
                            Categorias Cadastradas
                        </h3>

                        <div className="flex flex-wrap gap-3">
                            {[
                                "Salgados",
                                "Bebidas",
                                "Doces",
                                "Combos",
                            ].map((categoria, index) => (
                                <div
                                    key={index}
                                    className="px-4 py-2 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-400"
                                >
                                    {categoria}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}