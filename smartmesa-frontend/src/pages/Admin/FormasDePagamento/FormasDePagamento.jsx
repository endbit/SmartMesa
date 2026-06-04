import { useState } from "react";
import {
    CreditCard,
    Banknote,
    QrCode,
    Plus,
    Pencil,
    Trash2,
    ToggleLeft,
    ToggleRight,
} from "lucide-react";

export default function FormasDePagamento() {
    const [methods, setMethods] = useState([
        {
            id: 1,
            nome: "Cartão",
            descricao: "Crédito e débito",
            ativo: true,
            icon: CreditCard,
        },
        {
            id: 2,
            nome: "Dinheiro",
            descricao: "Pagamento em espécie",
            ativo: true,
            icon: Banknote,
        },
        {
            id: 3,
            nome: "PIX",
            descricao: "Transferência instantânea",
            ativo: true,
            icon: QrCode,
        },
    ]);

    function toggleMethod(id) {
        setMethods((prev) =>
            prev.map((m) =>
                m.id === id ? { ...m, ativo: !m.ativo } : m
            )
        );
    }

    return (
        <div className="space-y-8">

            {/* HEADER */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">
                        Pagamentos
                    </h1>

                    <p className="text-zinc-400 mt-2">
                        Gerencie as formas de pagamento aceitas no restaurante.
                    </p>
                </div>

                <button className="bg-orange-500 hover:bg-orange-400 transition px-6 py-3 rounded-2xl text-white font-semibold flex items-center gap-2">
                    <Plus size={18} />
                    Novo método
                </button>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

                {methods.map((method) => {
                    const Icon = method.icon;

                    return (
                        <div
                            key={method.id}
                            className="bg-white/3 border border-white/10 rounded-3xl p-6 space-y-4"
                        >

                            {/* topo */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-orange-400">
                                        <Icon size={20} />
                                    </div>

                                    <div>
                                        <h2 className="text-white font-bold">
                                            {method.nome}
                                        </h2>

                                        <p className="text-zinc-400 text-sm">
                                            {method.descricao}
                                        </p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => toggleMethod(method.id)}
                                    className="text-orange-400"
                                >
                                    {method.ativo ? (
                                        <ToggleRight size={28} />
                                    ) : (
                                        <ToggleLeft size={28} />
                                    )}
                                </button>
                            </div>

                            {/* status */}
                            <div className="flex items-center justify-between">
                                <span
                                    className={`text-sm px-3 py-1 rounded-xl border ${
                                        method.ativo
                                            ? "bg-green-500/10 text-green-400 border-green-500/20"
                                            : "bg-red-500/10 text-red-400 border-red-500/20"
                                    }`}
                                >
                                    {method.ativo ? "Ativo" : "Desativado"}
                                </span>

                                <div className="flex gap-2">
                                    <button className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-white">
                                        <Pencil size={18} />
                                    </button>

                                    <button className="w-10 h-10 rounded-xl bg-red-500/10 hover:bg-red-500/20 flex items-center justify-center text-red-400">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* INFO BOX */}
            <div className="bg-white/3 border border-white/10 rounded-3xl p-6">
                <h2 className="text-white font-bold mb-2">
                    💡 Dica do sistema
                </h2>

                <p className="text-zinc-400 text-sm">
                    Apenas métodos ativos aparecerão para o cliente na tela de pagamento.
                    Você pode ligar/desligar qualquer forma sem remover do sistema.
                </p>
            </div>

        </div>
    );
}