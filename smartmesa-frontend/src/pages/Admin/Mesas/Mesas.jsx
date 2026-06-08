import { Search, QrCode, Printer, CheckCircle } from "lucide-react";
import CreateTableForm from "./components/CreateTableForm";

export default function Mesas() {

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
                <CreateTableForm />

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

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="text-left text-zinc-400 py-2">Mesa</th>
                                    <th className="text-left text-zinc-400 py-2">Status</th>
                                    <th className="text-left text-zinc-400 py-2">Sessão</th>
                                    <th className="text-left text-zinc-400 py-2">QR</th>
                                    <th className="text-right text-zinc-400 py-2">Ações</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr className="border-b border-white/5">

                                    <td className="text-white py-4">Mesa 01</td>

                                    <td className="py-4">
                                        <span className="px-3 py-1 rounded-xl text-sm w-fit bg-emerald-500/10 text-emerald-400">Livre</span>
                                    </td>

                                    <td className="py-4">
                                        <span className="px-3 py-1 rounded-xl text-sm bg-gray-500/10 text-gray-400">Sessão Inativa</span>
                                    </td>

                                    <td className="py-4">
                                        <span className="px-3 py-1 rounded-xl bg-orange-500/10 text-orange-400 text-sm">Gerado</span>
                                    </td>

                                    <td className="py-4">
                                        <div className="flex items-center justify-center lg:justify-end gap-2 flex-wrap">
                                            <button className="w-11 h-11 flex items-center justify-center rounded-xl bg-green-500/10 text-green-400">
                                                <QrCode size={18} />
                                            </button>

                                            <button className="w-11 h-11 flex items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
                                                <Printer size={18} />
                                            </button>

                                            <button className="w-11 h-11 flex items-center justify-center rounded-xl bg-red-500/10 text-red-400">
                                                <CheckCircle size={18} />
                                            </button>

                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

        </div>
    );
}