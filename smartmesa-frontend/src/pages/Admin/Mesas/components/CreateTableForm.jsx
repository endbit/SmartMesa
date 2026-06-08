import {UtensilsCrossed} from "lucide-react";

export default function CreateTableForm() {
    return (
        <div className="bg-white/3 border border-white/10 rounded-3xl p-6">
            <div className="flex items-center gap-3 mb-6">
                <UtensilsCrossed className="text-orange-400" />
                <h2 className="text-xl font-bold text-white">Nova Mesa</h2>
            </div>

            <div className="space-y-4">
                <input
                    type="number"
                    placeholder="Número da mesa"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white outline-none"
                />

                <button className="w-full bg-orange-500 hover:bg-orange-400 py-3 transition rounded-2xl text-white font-semibold">
                    Salvar Mesa
                </button>
            </div>
        </div>
    )
}