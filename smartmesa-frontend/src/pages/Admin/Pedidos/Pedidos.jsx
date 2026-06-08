import { useEffect, useRef, useState } from "react";
import api from "../../../api/api";

import {
    ClipboardList,
    CheckCircle2,
    Eye,
    X,
    CreditCard,
    Banknote,
    QrCode,
} from "lucide-react";

import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export default function Pedidos() {

    const [search, setSearch] = useState("");
    const [selectedPedido, setSelectedPedido] = useState(null);
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);

    // 🔔 NOTIFICAÇÃO VISUAL
    const [toast, setToast] = useState(null);

    // 🔊 áudio persistente
    const audioRef = useRef(null);
    const audioUnlocked = useRef(false);

    // =========================
    // 📦 LOAD INICIAL
    // =========================
    useEffect(() => {
        loadPedidos();
    }, []);

    async function loadPedidos() {
        try {
            const res = await api.get("/orders");
            setPedidos(res.data);
        } catch (err) {
            console.error("Erro ao buscar pedidos:", err);
        } finally {
            setLoading(false);
        }
    }

    // =========================
    // 🔓 UNLOCK ÁUDIO
    // =========================
    useEffect(() => {
        const unlock = () => {
            audioUnlocked.current = true;

            if (!audioRef.current) {
                audioRef.current = new Audio("/sounds/new-order.mp3");
                audioRef.current.volume = 0.8;
                audioRef.current.preload = "auto";
            }

            window.removeEventListener("click", unlock);
        };

        window.addEventListener("click", unlock);
        return () => window.removeEventListener("click", unlock);
    }, []);

    function playNewOrderSound() {
        if (!audioUnlocked.current || !audioRef.current) return;

        try {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(() => { });
        } catch (e) {
            console.log("Som bloqueado");
        }
    }

    // =========================
    // 🔥 WEBSOCKET
    // =========================
    useEffect(() => {

        const socket = new SockJS("http://localhost:8080/ws");

        const stompClient = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            debug: () => { },
        });

        stompClient.onConnect = () => {

            stompClient.subscribe("/topic/orders", (msg) => {
                const novoPedido = JSON.parse(msg.body);

                setPedidos(prev => {
                    const exists = prev.find(p => p.id === novoPedido.id);

                    if (exists) {
                        return prev.map(p =>
                            p.id === novoPedido.id ? novoPedido : p
                        );
                    }

                    return [novoPedido, ...prev];
                });

                // 🔊 som
                playNewOrderSound();

                // 🔔 TOAST
                setToast({
                    id: novoPedido.orderNumber,
                    mesa: novoPedido.tableNumber,
                });

                setTimeout(() => {
                    setToast(null);
                }, 3500);
            });
        };

        stompClient.activate();
        return () => stompClient.deactivate();

    }, []);

    // =========================
    // 🔍 FILTRO
    // =========================
    const filteredPedidos = pedidos.filter(p =>
        !search ||
        String(p.orderNumber || p.id).includes(search) ||
        p.customerName?.toLowerCase().includes(search.toLowerCase())
    );

    // =========================
    // 🎨 STATUS
    // =========================
    function getStatusStyle(status) {
        switch (status) {
            case "PREPARING":
                return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
            case "READY":
                return "bg-green-500/10 text-green-400 border-green-500/20";
            case "OPEN":
                return "bg-cyan-500/10 text-cyan-400 border-cyan-500/20";
            default:
                return "bg-white/10 text-white border-white/10";
        }
    }

    function getStatusLabel(status) {
        switch (status) {
            case "PREPARING":
                return "Em preparo";
            case "READY":
                return "Pronto";
            case "OPEN":
                return "Recebido";
            default:
                return status;
        }
    }

    function getPaymentIcon(type) {
        switch (type) {
            case "PIX":
                return <QrCode size={18} className="text-green-400" />;
            case "Cartão":
                return <CreditCard size={18} className="text-blue-400" />;
            case "Dinheiro":
                return <Banknote size={18} className="text-yellow-400" />;
            default:
                return null;
        }
    }

    // =========================
    // 🧾 UI
    // =========================
    return (
        <div className="space-y-8 relative">

            {/* 🔔 TOAST NOVO PEDIDO (BOTTOM RIGHT) */}
            {toast && (
                <div className="fixed bottom-6 right-6 z-50 w-72">

                    <div className="
            bg-white/10 
            backdrop-blur-xl 
            border border-white/10
            text-white
            px-5 py-4 
            rounded-2xl 
            shadow-2xl

            transform transition-all duration-300 ease-out
            animate-in fade-in zoom-in-95
        ">

                        <div className="flex items-center gap-2 mb-1">
                            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                            <p className="font-semibold text-sm">
                                Novo pedido #{toast.id}
                            </p>
                        </div>

                        <p className="text-sm text-white/70">
                            Mesa {toast.mesa}
                        </p>

                    </div>
                </div>
            )}

            {/* HEADER */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                <div>
                    <h1 className="text-3xl font-bold text-white">
                        Pedidos
                    </h1>
                    <p className="text-zinc-400 mt-2">
                        Acompanhe os pedidos em tempo real da cozinha.
                    </p>
                </div>

                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar pedido..."
                    className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white outline-none focus:border-orange-500"
                />
            </div>

            {/* LISTA */}
            <div className="space-y-4">

                {loading && (
                    <p className="text-zinc-400">Carregando pedidos...</p>
                )}

                {!loading && filteredPedidos.map((pedido) => (
                    <div
                        key={pedido.id}
                        className="bg-white/5 border border-white/10 rounded-3xl p-5 flex items-center justify-between"
                    >

                        <div>
                            <div className="flex items-center gap-2 text-white font-semibold">
                                <ClipboardList size={18} />
                                Pedido #{pedido.orderNumber || pedido.id}
                            </div>

                            <p className="text-zinc-400 text-sm">
                                Mesa {pedido.tableNumber} • {pedido.customerName}
                            </p>

                            <p className="text-zinc-500 text-xs">
                                R$ {Number(pedido.totalPrice || 0).toFixed(2)}
                            </p>
                        </div>

                        <div className="flex items-center gap-3">

                            <span className={`px-3 py-1 rounded-xl text-sm border ${getStatusStyle(pedido.status)}`}>
                                {getStatusLabel(pedido.status)}
                            </span>

                            <button
                                onClick={() => setSelectedPedido(pedido)}
                                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-white"
                            >
                                <Eye size={18} />
                            </button>

                            {pedido.status === "OPEN" && (
                                <button className="w-10 h-10 rounded-xl bg-green-500/10 hover:bg-green-500/20 flex items-center justify-center text-green-400">
                                    <CheckCircle2 size={18} />
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* MODAL */}
            {selectedPedido && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">

                    <div className="w-full max-w-md bg-stone-900 border border-stone-800 rounded-3xl p-6 relative">

                        <button
                            onClick={() => setSelectedPedido(null)}
                            className="absolute top-4 right-4 text-stone-400 hover:text-white"
                        >
                            <X size={18} />
                        </button>

                        <h2 className="text-white font-bold text-lg mb-4">
                            Pedido #{selectedPedido.orderNumber || selectedPedido.id}
                        </h2>

                        <p className="text-stone-400 text-sm mb-2">
                            Cliente: {selectedPedido.customerName}
                        </p>

                        <div className="flex items-center gap-2 mb-4">
                            {getPaymentIcon(selectedPedido.paymentType)}
                            <span className="text-white">
                                {selectedPedido.paymentType}
                            </span>
                        </div>

                        <div className="space-y-2 border-t border-stone-800 pt-4">
                            {selectedPedido.items?.map((item, i) => (
                                <div key={i} className="flex justify-between text-stone-300 text-sm">
                                    <span>{item.productName}</span>
                                    <span>x{item.quantity}</span>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-stone-800 mt-4 pt-4 flex justify-between text-white font-bold">
                            <span>Total</span>
                            <span>R$ {Number(selectedPedido.totalPrice || 0).toFixed(2)}</span>
                        </div>

                        <button className="w-full mt-5 h-12 rounded-2xl bg-linear-to-r from-amber-500 to-red-500 text-black font-bold">
                            Aceitar pedido
                        </button>

                    </div>
                </div>
            )}
        </div>
    );
}