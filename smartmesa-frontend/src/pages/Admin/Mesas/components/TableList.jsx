import { QrCode, Printer, CheckCircle } from "lucide-react";

export default function TableList({ mesas }) {
    return (
        <div className="w-full overflow-x-auto p-2">
            <table className="w-full min-w-150">
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
                    {mesas.map(mesa => (
                        <tr key={mesa.id} className="border-b border-white/5">

                            <td className="text-white py-4">Mesa {mesa.number}</td>

                            <td className="py-4">
                                {mesa.active ? (
                                    <span className="px-3 py-1 rounded-xl text-sm w-fit bg-emerald-500/10 text-emerald-400">
                                        Ativa
                                    </span>
                                ) : (
                                    <span className="px-3 py-1 rounded-xl text-sm w-fit bg-red-500/10 text-red-400">
                                        Inativa
                                    </span>
                                )}
                            </td>

                            <td className="py-4">
                                <span className="px-3 py-1 rounded-xl text-sm bg-gray-500/10 text-gray-400">
                                    Sessão Inativa
                                </span>
                            </td>

                            <td className="py-4">
                                <span className="px-3 py-1 rounded-xl bg-orange-500/10 text-orange-400 text-sm">
                                    Gerado
                                </span>
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
                    ))}
                </tbody>
            </table>
        </div>
    );
}