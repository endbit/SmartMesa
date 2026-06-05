export default function ActiveOrder({
    table
}) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-5">

            <div className="max-w-md w-full bg-stone-900/70 border border-red-500/20 rounded-3xl p-8 text-center backdrop-blur-xl">

                <div className="text-5xl mb-4">
                    🚫
                </div>

                <h2 className="text-2xl font-bold text-white">
                    Mesa em atendimento
                </h2>

                <p className="text-stone-400 mt-4">
                    Já existe um pedido ativo para a mesa
                    <span className="text-amber-400 font-semibold">
                        {" "}#{table.number}
                    </span>
                </p>

                <p className="text-stone-500 text-sm mt-2">
                    Verifique com um atendente a disponibilidade da mesa
                </p>

            </div>

        </div>
    );
}