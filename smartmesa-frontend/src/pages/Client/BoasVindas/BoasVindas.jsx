import {ArrowRight, User, UtensilsCrossed, MapPin} from "lucide-react";
import { useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { useTable } from "./hooks";
import { openOrder } from "./services";
import Loading from "./components/Loading/Loading";
import InvalidTable from "./components/InvalidTable/InvalidTable";
import ActiveOrder from "./components/ActiveOrder/ActiveOrder";

export default function BoasVindas() {

    const [name, setName] = useState("");

    const navigate = useNavigate();
    const { token } = useParams();

    const {
        table,
        loading,
        hasActiveOrder
    } = useTable(token);

    async function handleContinueClick() {

        if (!table || !name.trim()) {
            return;
        }

        try {

            const order =
                await openOrder(
                    name.trim(),
                    table.number
                );

            navigate(
                `/menu/${token}/products`,
                {
                    state: {
                        name: name.trim(),
                        tableId: table.id,
                        tableNumber: table.number,
                        orderId: order.id
                    }
                }
            );

        } catch (error) {

            console.error(error);

            alert(
                "Esta mesa já possui um pedido aberto."
            );
        }
    }

    if (loading) return <Loading />;

    if (!table) return <InvalidTable />;

    if (hasActiveOrder) {
        return <ActiveOrder table={table} />;
    }

    return (
        <div className="min-h-screen relative overflow-hidden bg-linear-to-br from-zinc-950 via-stone-900 to-neutral-950 flex items-center justify-center px-5">

            {/* Glow */}
            <div className="absolute -top-24 -left-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-red-500/10 rounded-full blur-3xl animate-pulse" />

            <div className="w-full max-w-md relative z-10">

                {/* HEADER */}
                <div className="text-center mb-10">

                    <div className="w-24 h-24 mx-auto rounded-3xl bg-stone-900/60 backdrop-blur-xl shadow-2xl flex items-center justify-center border border-stone-700">

                        <UtensilsCrossed
                            size={38}
                            className="text-amber-400"
                        />

                    </div>

                    <h1 className="text-4xl font-bold mt-5 text-amber-100">
                        SmartMesa
                    </h1>

                    <p className="text-stone-300/80 mt-2 text-sm">
                        Sua experiência começa aqui 🍷
                    </p>

                </div>

                {/* CARD */}
                <div className="bg-stone-900/70 backdrop-blur-2xl border border-stone-700/60 rounded-3xl p-6 shadow-2xl">

                    <div className="flex items-center justify-between mb-6">

                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 text-sm font-medium">

                            <MapPin size={14} />
                            Mesa {table.number}

                        </span>

                        <span className="text-xs text-green-400">
                            Pronta para atendimento
                        </span>

                    </div>

                    <h2 className="text-amber-100 text-2xl font-semibold">
                        Bem-vindo 👋
                    </h2>

                    <p className="text-stone-300/80 mt-2 text-sm">
                        Como podemos te chamar hoje?
                    </p>

                    <div className="relative mt-6">

                        <User
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-300"
                        />

                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Ex: João, Maria..."
                            className="w-full h-14 pl-12 pr-4 rounded-2xl bg-stone-950/60 border border-stone-700 text-amber-50 outline-none focus:border-amber-400"
                        />

                    </div>

                    <button
                        onClick={handleContinueClick}
                        disabled={!name.trim()}
                        className="w-full mt-6 h-14 rounded-2xl bg-linear-to-r from-amber-500 to-red-500 text-white font-bold disabled:opacity-40"
                    >

                        Entrar no Cardápio

                        <ArrowRight
                            size={18}
                            className="inline ml-2"
                        />

                    </button>

                </div>

            </div>

        </div>
    );
}