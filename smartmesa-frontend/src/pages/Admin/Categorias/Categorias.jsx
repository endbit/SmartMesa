import { useState } from "react";
import {
    Tags,
    Plus,
    Search,
    Pencil,
    Trash2,
} from "lucide-react";

export default function Categorias() {
    const [search, setSearch] = useState("");

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">
                        Categorias
                    </h1>

                    <p className="text-zinc-400 mt-2">
                        Gerencie as categorias do cardápio.
                    </p>
                </div>

                <button className="bg-orange-500 hover:bg-orange-400 transition px-6 py-3 rounded-2xl text-white font-semibold flex items-center gap-2">
                    <Plus size={18} />
                    Nova Categoria
                </button>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Formulário */}
                <div className="bg-white/3 border border-white/10 rounded-3xl p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <Tags className="text-orange-400" />

                        <h2 className="text-xl font-bold text-white">
                            Nova Categoria
                        </h2>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="text-zinc-400 text-sm">
                                Nome da Categoria
                            </label>

                            <input
                                type="text"
                                placeholder="Ex: Salgados"
                                className="w-full mt-2 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white outline-none focus:border-orange-500"
                            />
                        </div>

                        <div>
                            <label className="text-zinc-400 text-sm">
                                Descrição
                            </label>

                            <textarea
                                rows="4"
                                placeholder="Descrição da categoria..."
                                className="w-full mt-2 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white outline-none focus:border-orange-500 resize-none"
                            />
                        </div>

                        <button className="w-full bg-orange-500 hover:bg-orange-400 transition py-3 rounded-2xl text-white font-semibold">
                            Salvar Categoria
                        </button>
                    </div>
                </div>

                {/* Tabela */}
                <div className="xl:col-span-2 bg-white/3 border border-white/10 rounded-3xl p-6">
                    <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between mb-6">
                        <div>
                            <h2 className="text-xl font-bold text-white">
                                Categorias Cadastradas
                            </h2>

                            <p className="text-zinc-400 text-sm mt-1">
                                Gerencie as categorias disponíveis.
                            </p>
                        </div>

                        <div className="relative">
                            <Search
                                size={18}
                                className="absolute left-4 top-3.5 text-zinc-500"
                            />

                            <input
                                type="text"
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                placeholder="Pesquisar categoria..."
                                className="bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 py-3 text-white outline-none focus:border-orange-500"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="text-left py-4 text-zinc-400 font-medium">
                                        Categoria
                                    </th>

                                    <th className="text-left py-4 text-zinc-400 font-medium">
                                        Descrição
                                    </th>

                                    <th className="text-left py-4 text-zinc-400 font-medium">
                                        Produtos
                                    </th>

                                    <th className="text-right py-4 text-zinc-400 font-medium">
                                        Ações
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {[
                                    {
                                        nome: "Salgados",
                                        descricao:
                                            "Coxinhas, pastéis e similares",
                                        produtos: 12,
                                    },
                                    {
                                        nome: "Bebidas",
                                        descricao:
                                            "Cafés, sucos e refrigerantes",
                                        produtos: 8,
                                    },
                                    {
                                        nome: "Doces",
                                        descricao:
                                            "Sobremesas e doces",
                                        produtos: 5,
                                    },
                                ].map((category, index) => (
                                    <tr
                                        key={index}
                                        className="border-b border-white/5"
                                    >
                                        <td className="py-4">
                                            <span className="px-3 py-1 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
                                                {category.nome}
                                            </span>
                                        </td>

                                        <td className="py-4 text-zinc-400">
                                            {category.descricao}
                                        </td>

                                        <td className="py-4">
                                            <span className="px-3 py-1 rounded-xl bg-cyan-500/10 text-cyan-400 text-sm">
                                                {category.produtos}
                                            </span>
                                        </td>

                                        <td className="py-4">
                                            <div className="flex justify-end gap-2">
                                                <button className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-300 transition">
                                                    <Pencil size={18} />
                                                </button>

                                                <button className="w-10 h-10 rounded-xl bg-red-500/10 hover:bg-red-500/20 flex items-center justify-center text-red-400 transition">
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Resumo */}
                    <div className="mt-6 border-t border-white/10 pt-6">
                        <div className="flex items-center justify-between">
                            <span className="text-zinc-400">
                                Total de Categorias
                            </span>

                            <span className="text-white font-semibold">
                                3
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}