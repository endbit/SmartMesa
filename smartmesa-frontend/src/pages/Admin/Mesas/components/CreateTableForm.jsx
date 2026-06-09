import { UtensilsCrossed } from "lucide-react";
import { CriarNovaMesa } from "../js/services";
import { useState } from "react";

export default function CreateTableForm({ onCreated }) {
    const [data, setData] = useState({ number: "" });

    async function SalvarMesa() {
        console.log(data);

        try {
            const response = await CriarNovaMesa(data);
            console.log("NOVA MESA SALVA NO BD:", response);
            alert(`Mesa ${data.number} criada com sucesso`);
            if (onCreated) onCreated();
            setData({ number: "" });

        } catch (error) {
            console.log("ERRO AO SALVAR MESA NO BD:", error);
        }
    }

    return (
        <div className="bg-white/3 border border-white/10 rounded-3xl p-6 max-h-[25vh]">
            <div className="flex items-center gap-3 mb-6">
                <UtensilsCrossed className="text-orange-400" />
                <h2 className="text-xl font-bold text-white">Nova Mesa</h2>
            </div>

            <div className="space-y-4">
                <input
                    type="number"
                    value={data.number}
                    onChange={(e) => {
                        const valor = parseInt(e.target.value);

                        setData({
                            number: Number.isNaN(valor) ? "" : valor
                        });
                    }}
                    placeholder="Número da mesa"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white outline-none"
                />

                <button
                    onClick={SalvarMesa}
                    className="w-full bg-orange-500 hover:bg-orange-400 py-3 transition rounded-2xl text-white font-semibold"
                >
                    Salvar Mesa
                </button>
            </div>
        </div>
    );
}