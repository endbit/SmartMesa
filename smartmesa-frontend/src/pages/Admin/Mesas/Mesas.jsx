import jsPDF from "jspdf";
import QRCode from "qrcode";
import { useEffect, useState } from "react";
import {
    UtensilsCrossed,
    Plus,
    Search,
    Pencil,
    Trash2,
    QrCode,
    Printer,
    Eye,
    CheckCircle
} from "lucide-react";

import { QRCodeCanvas } from "qrcode.react";
import api from "../../../api/api";

export default function Mesas() {
    const [search, setSearch] = useState("");
    const [tables, setTables] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTable, setSelectedTable] = useState(null);

    const [form, setForm] = useState({
        number: "",
        description: "",
    });

    const [saving, setSaving] = useState(false);

    // ========================
    // TABLES
    // ========================
    useEffect(() => {
        async function loadTables() {
            try {
                const res = await api.get("/tables");
                setTables(res.data);
            } catch (err) {
                console.error("Erro ao buscar mesas:", err);
            } finally {
                setLoading(false);
            }
        }

        loadTables();
    }, []);

    // ========================
    // SESSÕES (NOVO - SEM 500)
    // ========================
    useEffect(() => {
        if (!tables.length) return;

        const loadSessions = async () => {
            try {
                const all = [];

                for (const table of tables) {
                    if (!table?.token) continue;

                    try {
                        const res = await api.get(`/sessions/table/${table.token}`);
                        if (res.data) all.push(res.data);
                    } catch (err) {
                        // evita quebrar tudo se mesa não tiver sessão ainda
                        console.warn("Sem sessão para mesa:", table.number);
                    }
                }

                setSessions(all);
            } catch (err) {
                console.error("Erro ao buscar sessões:", err);
            }
        };

        loadSessions();
    }, [tables]);

    const getSessionByTable = (tableId) => {
        return sessions.find(s => s.table?.id === tableId);
    };

    const filteredTables = tables.filter((t) =>
        String(t.number).includes(search)
    );

    const handleChange = (e) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleCreateTable = async () => {
        if (!form.number) return;

        setSaving(true);

        try {
            const res = await api.post("/tables", {
                number: Number(form.number),
                description: form.description,
            });

            setTables((prev) => [res.data, ...prev]);

            setForm({
                number: "",
                description: "",
            });

        } catch (err) {
            console.error("Erro ao criar mesa:", err);
        } finally {
            setSaving(false);
        }
    };

    // ========================
    // QR CODE (INTACTO)
    // ========================
    const SESSION_URL = (token) =>
        `${window.location.origin}/menu/${token}`;

    const printQRCode = async (table) => {
        if (!table?.token) return;

        const doc = new jsPDF();
        const url = SESSION_URL(table.token);

        try {
            const qrDataUrl = await QRCode.toDataURL(url);

            const pageWidth = 210;
            const centerX = pageWidth / 2;

            doc.setFillColor(255, 140, 0);
            doc.rect(0, 0, 210, 40, "F");

            doc.setFillColor(255, 200, 0);
            doc.circle(30, 20, 25, "F");
            doc.circle(180, 15, 20, "F");

            doc.setTextColor(255, 255, 255);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(18);
            doc.text("SmartMesa", centerX, 20, { align: "center" });

            doc.setFontSize(10);
            doc.text("Sistema de Cardápio Digital", centerX, 28, {
                align: "center",
            });

            doc.setTextColor(30, 30, 30);
            doc.setFontSize(22);
            doc.text(`Mesa ${table.number}`, centerX, 65, {
                align: "center",
            });

            doc.setFontSize(11);
            doc.setTextColor(120, 120, 120);
            doc.text(
                "Aponte a câmera do celular para acessar o cardápio",
                centerX,
                75,
                { align: "center", maxWidth: 170 }
            );

            doc.addImage(qrDataUrl, "PNG", centerX - 40, 85, 80, 80);

            doc.setFontSize(9);
            doc.setTextColor(160, 160, 160);
            doc.text(url, centerX, 175, {
                align: "center",
                maxWidth: 180,
            });

            doc.setFillColor(255, 140, 0);
            doc.rect(0, 185, 210, 12, "F");

            doc.setTextColor(255, 255, 255);
            doc.setFontSize(10);
            doc.text("Bom apetite | SmartMesa", centerX, 193, {
                align: "center",
            });

            doc.save(`smartmesa-mesa-${table.number}.pdf`);
        } catch (err) {
            console.error("Erro ao gerar PDF:", err);
        }
    };

    // ========================
    // ENCERRAR SESSÃO
    // ========================
    const closeSession = async (tableId) => {
        try {
            await api.patch(`/sessions/table/${tableId}/close`);

            setSessions(prev =>
                prev.map(s =>
                    s.table?.id === tableId
                        ? { ...s, active: false }
                        : s
                )
            );
        } catch (err) {
            console.error("Erro ao encerrar sessão:", err);
        }
    };

    return (
        <div className="space-y-8 px-4 lg:px-0">

            {/* HEADER */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                <div>
                    <h1 className="text-3xl font-bold text-white">Mesas</h1>
                    <p className="text-zinc-400 mt-2">
                        Gerencie mesas e QR Codes do cardápio.
                    </p>
                </div>

                <button className="bg-orange-500 hover:bg-orange-400 transition px-6 py-3 rounded-2xl text-white font-semibold flex items-center justify-center gap-2">
                    <Plus size={18} />
                    Nova Mesa
                </button>

            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                {/* FORM */}
                <div className="bg-white/3 border border-white/10 rounded-3xl p-6">

                    <div className="flex items-center gap-3 mb-6">
                        <UtensilsCrossed className="text-orange-400" />
                        <h2 className="text-xl font-bold text-white">
                            Nova Mesa
                        </h2>
                    </div>

                    <div className="space-y-4">

                        <input
                            name="number"
                            value={form.number}
                            onChange={handleChange}
                            type="number"
                            placeholder="Número da mesa"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white outline-none"
                        />

                        <input
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            type="text"
                            placeholder="Descrição"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white outline-none"
                        />

                        <button
                            onClick={handleCreateTable}
                            disabled={saving}
                            className="w-full bg-orange-500 hover:bg-orange-400 py-3 transition rounded-2xl text-white font-semibold disabled:opacity-50"
                        >
                            {saving ? "Salvando..." : "Salvar Mesa"}
                        </button>

                    </div>
                </div>

                {/* LISTA */}
                <div className="xl:col-span-2 bg-white/3 border border-white/10 rounded-3xl p-6">

                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">

                        <h2 className="text-xl font-bold text-white">
                            Mesas Cadastradas
                        </h2>

                        <div className="relative w-full sm:w-auto">
                            <Search size={18} className="absolute left-4 top-3.5 text-zinc-500" />

                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Pesquisar mesa..."
                                className="w-full sm:w-64 bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 py-3 text-white outline-none"
                            />
                        </div>

                    </div>

                    {loading ? (
                        <p className="text-zinc-400">Carregando...</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-162.5">

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
                                    {filteredTables.map((table) => {

                                        const session = getSessionByTable(table.id);

                                        return (
                                            <tr key={table.id} className="border-b border-white/5">

                                                <td className="text-white py-4">
                                                    Mesa {table.number}
                                                </td>

                                                <td className="py-4">
                                                    <span className={`px-3 py-1 rounded-xl text-sm w-fit ${
                                                        table.occupied
                                                            ? "bg-red-500/10 text-red-400"
                                                            : "bg-emerald-500/10 text-emerald-400"
                                                    }`}>
                                                        {table.occupied ? "Ocupada" : "Livre"}
                                                    </span>
                                                </td>

                                                <td className="py-4">
                                                    <span className={`px-3 py-1 rounded-xl text-sm ${
                                                        session?.active
                                                            ? "bg-green-500/10 text-green-400"
                                                            : "bg-zinc-500/10 text-zinc-400"
                                                    }`}>
                                                        {session?.active ? "Sessão ativa" : "Sem sessão"}
                                                    </span>
                                                </td>

                                                <td className="py-4">
                                                    <span className="px-3 py-1 rounded-xl bg-orange-500/10 text-orange-400 text-sm">
                                                        {table.token ? "Gerado" : "Pendente"}
                                                    </span>
                                                </td>

                                                <td className="py-4">
                                                    <div className="flex items-center justify-center lg:justify-end gap-2 flex-wrap">

                                                        <button
                                                            onClick={() => setSelectedTable(table)}
                                                            className="w-11 h-11 flex items-center justify-center rounded-xl bg-green-500/10 text-green-400"
                                                        >
                                                            <QrCode size={18} />
                                                        </button>

                                                        <button
                                                            onClick={() => printQRCode(table)}
                                                            className="w-11 h-11 flex items-center justify-center rounded-xl bg-orange-500/10 text-orange-400"
                                                        >
                                                            <Printer size={18} />
                                                        </button>

                                                        <button
                                                            onClick={() => closeSession(table.id)}
                                                            className="w-11 h-11 flex items-center justify-center rounded-xl bg-red-500/10 text-red-400"
                                                        >
                                                            <CheckCircle size={18} />
                                                        </button>

                                                    </div>
                                                </td>

                                            </tr>
                                        );
                                    })}
                                </tbody>

                            </table>
                        </div>
                    )}

                </div>
            </div>

            {/* MODAL (QR INTACTO) */}
            {selectedTable && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">

                    <div className="bg-zinc-900 w-full max-w-sm rounded-2xl border border-white/10 shadow-2xl flex flex-col items-center p-6">

                        <h2 className="text-white text-lg font-semibold mb-6">
                            Mesa {selectedTable.number}
                        </h2>

                        <div className="bg-white p-3 rounded-xl flex items-center justify-center">
                            <QRCodeCanvas
                                value={SESSION_URL(selectedTable.token)}
                                size={200}
                                bgColor="#ffffff"
                                fgColor="#000000"
                            />
                        </div>

                        <p className="text-zinc-400 text-xs mt-4 break-all text-center">
                            {selectedTable.token}
                        </p>

                        <button
                            className="mt-6 w-full bg-white/10 hover:bg-white/20 py-2 rounded-xl text-white transition"
                            onClick={() => setSelectedTable(null)}
                        >
                            Fechar
                        </button>

                    </div>
                </div>
            )}

        </div>
    );
}