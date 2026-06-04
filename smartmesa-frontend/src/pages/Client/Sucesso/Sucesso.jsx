import { CheckCircle, Clock, ChefHat, Receipt } from "lucide-react";

export default function Sucesso() {
    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-zinc-950 via-stone-900 to-neutral-950 flex items-center justify-center px-5 pb-28">

            {/* Glow ambiente */}
            <div className="absolute -top-24 -left-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-red-500/10 rounded-full blur-3xl" />

            <div className="w-full max-w-md relative z-10 flex flex-col items-center text-center">

                {/* Ícone principal */}
                <div className="w-28 h-28 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20 shadow-xl">
                    <CheckCircle size={64} className="text-amber-400" />
                </div>

                {/* Título */}
                <h1 className="text-amber-100 text-2xl font-bold mt-6">
                    Pedido confirmado 🍷
                </h1>

                <p className="text-stone-400 mt-2">
                    Sua comanda foi enviada diretamente para a cozinha
                </p>

                {/* CARD */}
                <div className="mt-8 w-full bg-stone-900/70 backdrop-blur-xl border border-stone-800 rounded-3xl p-6 shadow-xl text-left">

                    {/* status cozinha */}
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-amber-500/10 flex items-center justify-center">
                            <ChefHat className="text-amber-400" size={20} />
                        </div>

                        <div>
                            <p className="text-amber-100 font-semibold">
                                Pedido em preparo
                            </p>
                            <p className="text-stone-400 text-sm">
                                Nossa equipe já está preparando seu pedido
                            </p>
                        </div>
                    </div>

                    <div className="border-t border-stone-800 my-5" />

                    {/* tempo */}
                    <div className="flex items-center gap-3">
                        <Clock className="text-amber-400" size={20} />

                        <div>
                            <p className="text-amber-100 font-semibold">
                                Tempo estimado
                            </p>
                            <p className="text-stone-400 text-sm">
                                20 a 30 minutos
                            </p>
                        </div>
                    </div>

                    <p className="text-stone-500 text-sm mt-5">
                        Você pode acompanhar o status do pedido direto da sua mesa em tempo real.
                    </p>
                </div>

                {/* número do pedido */}
                <div className="mt-8">
                    <div className="flex items-center justify-center gap-2 text-stone-400 text-sm">
                        <Receipt size={16} />
                        Número do pedido
                    </div>

                    <p className="text-amber-400 text-4xl font-bold mt-1 tracking-widest">
                        #1024
                    </p>

                    <p className="text-stone-500 text-xs mt-2">
                        Guarde este número para referência
                    </p>
                </div>
            </div>

            {/* BOTÃO FIXO ALINHADO */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-stone-950/80 backdrop-blur-xl border-t border-stone-800 flex justify-center">
                
                <div className="w-full max-w-md">
                    <button className="w-full h-14 rounded-2xl bg-gradient-to-r from-amber-500 to-red-500 text-black font-bold shadow-xl active:scale-[0.98] transition">
                        Acompanhar pedido
                    </button>
                </div>

            </div>
        </div>
    );
}