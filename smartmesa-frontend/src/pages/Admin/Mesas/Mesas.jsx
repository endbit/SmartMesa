import { useEffect, useState } from "react";
import CreateTableForm from "./components/CreateTableForm";
import TableList from "./components/TableList";
import { Search } from "lucide-react";
import { CarregarMesas } from "./js/services";

export default function Mesas() {
    const [mesas, setMesas] = useState([]);

    async function PopularTabela() {
        try {
            const dados = await CarregarMesas();
            console.log("Dados recebidos:", dados);
            setMesas(dados);
        } catch (error) {
            console.log("Erro ao carregar mesas:", error);
        }
    }

    useEffect(() => {
        PopularTabela();
    }, [])

    return (
        <div className="space-y-8 px-4 lg:px-0">

            {/* HEADER */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">Mesas</h1>
                    <p className="text-zinc-400 mt-2">Gerencie mesas e QR Codes do cardápio.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                {/* FORM */}
                <CreateTableForm onCreated={PopularTabela} />

                {/* LISTA */}
                <div className="xl:col-span-2 bg-white/3 border border-white/10 rounded-3xl p-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                        <h2 className="text-xl font-bold text-white">Mesas Cadastradas</h2>

                        <div className="relative w-full sm:w-auto">
                            <Search size={18} className="absolute left-4 top-3.5 text-zinc-500" />

                            <input
                                type="text"
                                placeholder="Pesquisar mesa..."
                                className="w-full sm:w-64 bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 py-3 text-white outline-none"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto max-h-[60vh] overflow-y-auto">
                        <TableList mesas={mesas} />
                    </div>
                </div>

            </div>

        </div>
    );
}