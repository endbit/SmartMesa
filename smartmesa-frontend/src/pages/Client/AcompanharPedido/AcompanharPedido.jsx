import { Check, CookingPot, PackageCheck, Timer } from "lucide-react";

export default function AcompanharPedido() {
    const pedido = {
        id: 1024,
        status: "preparo",
        mesa: 4,
        tempoEstimado: "20-30 min",
    };

    const steps = [
        {
            id: 1,
            label: "Pedido recebido",
            icon: Check,
            done: true,
        },
        {
            id: 2,
            label: "Em preparo",
            icon: CookingPot,
            done: true,
        },
        {
            id: 3,
            label: "Pronto para entrega",
            icon: PackageCheck,
            done: false,
        },
    ];

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-zinc-950 via-stone-900 to-neutral-950 flex flex-col items-center px-5 pb-28">

            {/* Glow ambiente */}
            <div className="absolute -top-24 -left-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-red-500/10 rounded-full blur-3xl" />

            <div className="w-full max-w-md relative z-10">

                {/* HEADER */}
                <div className="sticky top-0 z-40 backdrop-blur-xl bg-stone-950/70 border-b border-stone-800 px-4 py-4 rounded-b-2xl">
                    <h1 className="text-amber-100 text-xl font-bold">
                        📡 Acompanhar pedido
                    </h1>

                    <p className="text-stone-400 text-sm mt-1">
                        Pedido #{pedido.id} • Mesa #{pedido.mesa}
                    </p>
                </div>

                {/* STATUS GERAL */}
                <div className="mt-6 bg-stone-900/70 backdrop-blur-xl border border-stone-800 rounded-3xl p-5 shadow-xl text-center">

                    <div className="flex items-center justify-center gap-2 text-amber-400">
                        <Timer size={18} />
                        <span className="font-semibold">
                            Tempo estimado: {pedido.tempoEstimado}
                        </span>
                    </div>

                    <p className="text-stone-400 text-sm mt-2">
                        A cozinha já está preparando seu pedido 🍳
                    </p>
                </div>

                {/* TIMELINE */}
                <div className="mt-6 space-y-4">

                    {steps.map((step) => {
                        const Icon = step.icon;

                        return (
                            <div
                                key={step.id}
                                className={`flex items-center gap-4 p-4 rounded-3xl border shadow-md transition ${
                                    step.done
                                        ? "bg-stone-900/80 border-amber-500/30"
                                        : "bg-stone-900/50 border-stone-800"
                                }`}
                            >
                                <div
                                    className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                                        step.done
                                            ? "bg-amber-500/10"
                                            : "bg-stone-800"
                                    }`}
                                >
                                    <Icon
                                        size={22}
                                        className={
                                            step.done
                                                ? "text-amber-400"
                                                : "text-stone-400"
                                        }
                                    />
                                </div>

                                <div className="flex-1">
                                    <p className="text-amber-100 font-semibold">
                                        {step.label}
                                    </p>

                                    <p className="text-stone-400 text-sm">
                                        {step.done ? "Concluído" : "Aguardando"}
                                    </p>
                                </div>

                                {step.done && (
                                    <Check className="text-amber-400" size={18} />
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* STATUS ATUAL */}
                <div className="mt-6 bg-amber-500/10 border border-amber-500/20 rounded-3xl p-5 text-center">

                    <p className="text-amber-400 font-semibold">
                        Status atual
                    </p>

                    <p className="text-amber-100 text-lg mt-1 font-bold">
                        Em preparo 🍳
                    </p>
                </div>

            </div>

            {/* BOTÃO FIXO */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-stone-950/80 backdrop-blur-xl border-t border-stone-800 flex justify-center">

                <div className="w-full max-w-md">
                    <button className="w-full h-14 rounded-2xl bg-gradient-to-r from-amber-500 to-red-500 text-black font-bold shadow-xl active:scale-[0.98] transition">
                        Voltar ao cardápio
                    </button>
                </div>

            </div>
        </div>
    );
}