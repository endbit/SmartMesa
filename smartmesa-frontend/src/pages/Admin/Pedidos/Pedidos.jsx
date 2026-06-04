import { useState } from "react";
import {
    ClipboardList,
    CookingPot,
    CheckCircle2,
    Clock,
    Search,
    Eye,
    ArrowRight,
    X,
    CreditCard,
    Banknote,
    QrCode,
} from "lucide-react";

export default function Pedidos() {
    const [search, setSearch] = useState("");
    const [selectedPedido, setSelectedPedido] = useState(null);

    const pedidos = [
        {
            id: 1024,
            mesa: 4,
            cliente: "João",
            status: "recebido",
            total: 27.0,
            itens: [
                { nome: "Coxinha", qtd: 2 },
                { nome: "Pastel", qtd: 1 },
            ],
            pagamento: "PIX",
        },
        {
            id: 1025,
            mesa: 2,
            cliente: "Maria",
            status: "preparo",
            total: 18.5,
            itens: [{ nome: "Café", qtd: 2 }],
            pagamento: "Cartão",
        },
    ];

    function getStatusStyle(status) {
        switch (status) {
            case "preparo":
                return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
            case "pronto":
                return "bg-green-500/10 text-green-400 border-green-500/20";
            case "recebido":
                return "bg-cyan-500/10 text-cyan-400 border-cyan-500/20";
            default:
                return "bg-white/10 text-white border-white/10";
        }
    }

    function getStatusLabel(status) {
        switch (status) {
            case "preparo":
                return "Em preparo";
            case "pronto":
                return "Pronto";
            case "recebido":
                return "Recebido";
            default:
                return status;
        }
    }

    function getPaymentIcon(type) {
        switch (type) {
            case "PIX":
                return <QrCode size={18} className="text-green-400" />;
            case "Cartão":
                return <CreditCard size={18} className="text-blue-400" />;
            case "Dinheiro":
                return <Banknote size={18} className="text-yellow-400" />;
            default:
                return null;
        }
    }

    return (
        <div className="space-y-8">

            {/* HEADER */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">
                        Pedidos
                    </h1>
                    <p className="text-zinc-400 mt-2">
                        Acompanhe os pedidos em tempo real da cozinha.
                    </p>
                </div>

                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar pedido..."
                    className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white outline-none focus:border-orange-500"
                />
            </div>

            {/* LISTA */}
            <div className="space-y-4">

                {pedidos.map((pedido) => (
                    <div
                        key={pedido.id}
                        className="bg-white/3 border border-white/10 rounded-3xl p-5 flex items-center justify-between"
                    >

                        {/* INFO */}
                        <div>
                            <div className="flex items-center gap-2 text-white font-semibold">
                                <ClipboardList size={18} />
                                Pedido #{pedido.id}
                            </div>

                            <p className="text-zinc-400 text-sm">
                                Mesa {pedido.mesa} • {pedido.cliente}
                            </p>

                            <p className="text-zinc-500 text-xs">
                                R$ {pedido.total.toFixed(2)}
                            </p>
                        </div>

                        {/* AÇÕES */}
                        <div className="flex items-center gap-3">

                            <span
                                className={`px-3 py-1 rounded-xl text-sm border ${getStatusStyle(
                                    pedido.status
                                )}`}
                            >
                                {getStatusLabel(pedido.status)}
                            </span>

                            {/* 👀 VER DETALHES */}
                            <button
                                onClick={() => setSelectedPedido(pedido)}
                                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-white"
                            >
                                <Eye size={18} />
                            </button>

                            {/* ✅ ACEITAR PEDIDO */}
                            {pedido.status === "recebido" && (
                                <button className="w-10 h-10 rounded-xl bg-green-500/10 hover:bg-green-500/20 flex items-center justify-center text-green-400">
                                    <CheckCircle2 size={18} />
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* 🧾 MODAL */}
            {selectedPedido && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">

                    <div className="w-full max-w-md bg-stone-900 border border-stone-800 rounded-3xl p-6 relative">

                        {/* fechar */}
                        <button
                            onClick={() => setSelectedPedido(null)}
                            className="absolute top-4 right-4 text-stone-400 hover:text-white"
                        >
                            <X size={18} />
                        </button>

                        <h2 className="text-white font-bold text-lg mb-4">
                            Pedido #{selectedPedido.id}
                        </h2>

                        <p className="text-stone-400 text-sm mb-2">
                            Cliente: {selectedPedido.cliente}
                        </p>

                        {/* pagamento */}
                        <div className="flex items-center gap-2 mb-4">
                            {getPaymentIcon(selectedPedido.pagamento)}
                            <span className="text-white">
                                {selectedPedido.pagamento}
                            </span>
                        </div>

                        {/* itens */}
                        <div className="space-y-2 border-t border-stone-800 pt-4">
                            {selectedPedido.itens.map((item, i) => (
                                <div
                                    key={i}
                                    className="flex justify-between text-stone-300 text-sm"
                                >
                                    <span>{item.nome}</span>
                                    <span>x{item.qtd}</span>
                                </div>
                            ))}
                        </div>

                        {/* total */}
                        <div className="border-t border-stone-800 mt-4 pt-4 flex justify-between text-white font-bold">
                            <span>Total</span>
                            <span>R$ {selectedPedido.total.toFixed(2)}</span>
                        </div>

                        {/* ação */}
                        <button className="w-full mt-5 h-12 rounded-2xl bg-gradient-to-r from-amber-500 to-red-500 text-black font-bold">
                            Aceitar pedido
                        </button>

                    </div>
                </div>
            )}
        </div>
    );
}