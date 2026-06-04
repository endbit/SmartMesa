import { CreditCard, Banknote, QrCode, CheckCircle2 } from "lucide-react";

export default function Pagamento() {
    const total = 3.0;

    const paymentMethods = [
        {
            id: 1,
            nome: "Cartão",
            descricao: "Crédito ou débito na mesa",
            icon: CreditCard,
        },
        {
            id: 2,
            nome: "Dinheiro",
            descricao: "Pagamento em espécie",
            icon: Banknote,
        },
        {
            id: 3,
            nome: "PIX",
            descricao: "Transferência instantânea",
            icon: QrCode,
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-stone-900 to-neutral-950 pb-44">

            {/* HEADER */}
            <div className="sticky top-0 z-40 backdrop-blur-xl bg-stone-950/70 border-b border-stone-800 px-4 py-4">
                <h1 className="text-amber-100 text-xl font-bold tracking-tight flex items-center gap-2">
                    💳 Pagamento
                </h1>

                <p className="text-stone-400 text-sm mt-1">
                    Finalize seu pedido com segurança 🍷
                </p>
            </div>

            {/* TOTAL */}
            <div className="px-4 mt-6">
                <div className="bg-stone-900/70 border border-stone-800 rounded-3xl p-6 text-center shadow-xl">

                    <p className="text-stone-400 text-sm">
                        Total a pagar
                    </p>

                    <h2 className="text-amber-400 text-4xl font-bold mt-2">
                        R$ {total.toFixed(2)}
                    </h2>

                    <p className="text-stone-500 text-xs mt-2">
                        Taxas incluídas automaticamente
                    </p>

                </div>
            </div>

            {/* MÉTODOS */}
            <div className="px-4 mt-6 space-y-4">

                <p className="text-stone-400 text-sm">
                    Escolha a forma de pagamento
                </p>

                {paymentMethods.map((method) => {
                    const Icon = method.icon;

                    return (
                        <button
                            key={method.id}
                            className="w-full flex items-center gap-4 bg-stone-900/70 border border-stone-800 rounded-3xl p-4 shadow-md hover:border-amber-500/40 transition"
                        >

                            {/* ICON */}
                            <div className="w-12 h-12 rounded-2xl bg-stone-950/60 border border-stone-800 flex items-center justify-center">
                                <Icon className="text-amber-400" size={22} />
                            </div>

                            {/* TEXTOS */}
                            <div className="text-left flex-1">
                                <h3 className="text-amber-100 font-semibold">
                                    {method.nome}
                                </h3>

                                <p className="text-stone-400 text-sm">
                                    {method.descricao}
                                </p>
                            </div>

                            {/* indicador visual (futuro selected state) */}
                            <div className="text-stone-600">
                                <CheckCircle2 size={18} />
                            </div>

                        </button>
                    );
                })}
            </div>

            {/* BOTÃO FIXO */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-stone-950/80 backdrop-blur-xl border-t border-stone-800">

                <button className="w-full h-14 rounded-2xl bg-gradient-to-r from-amber-500 to-red-500 text-black font-bold shadow-xl flex items-center justify-between px-5 active:scale-[0.98] transition">

                    <span>Confirmar forma de pagamento</span>

                    <span className="font-bold">
                        R$ {total.toFixed(2)}
                    </span>

                </button>

            </div>
        </div>
    );
}