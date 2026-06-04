import {
    DollarSign,
    ClipboardList,
    ChefHat,
    Package,
    TrendingUp,
    Activity,
    AlertTriangle,
} from "lucide-react";

export default function Dashboard() {
    const stats = [
        {
            title: "Vendas Hoje",
            value: "R$ 458,00",
            icon: DollarSign,
            growth: "+12%",
        },
        {
            title: "Pedidos Hoje",
            value: "124",
            icon: ClipboardList,
            growth: "+8%",
        },
        {
            title: "Em Preparo",
            value: "7",
            icon: ChefHat,
            growth: "Tempo Real",
        },
        {
            title: "Estoque Baixo",
            value: "3",
            icon: Package,
            growth: "Atenção",
        },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">
                        Dashboard
                    </h1>

                    <p className="text-zinc-400 mt-2">
                        Acompanhe pedidos, vendas e estoque em tempo real.
                    </p>
                </div>

                <button className="bg-orange-500 hover:bg-orange-400 transition px-6 py-3 rounded-2xl text-white font-semibold w-full lg:w-fit">
                    Exportar Relatório
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                {stats.map((item, index) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={index}
                            className="bg-white/3 border border-white/10 rounded-3xl p-5 backdrop-blur-xl"
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-zinc-400 text-sm">
                                        {item.title}
                                    </p>

                                    <h2 className="text-3xl font-bold text-white mt-3">
                                        {item.value}
                                    </h2>
                                </div>

                                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-400">
                                    <Icon size={24} />
                                </div>
                            </div>

                            <div className="flex items-center gap-2 mt-6">
                                <TrendingUp
                                    size={16}
                                    className="text-green-400"
                                />

                                <span className="text-green-400 text-sm font-medium">
                                    {item.growth}
                                </span>

                                <span className="text-zinc-500 text-sm">
                                    hoje
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
                {/* Pedidos em Tempo Real */}
                <div className="xl:col-span-2 bg-white/3 border border-white/10 rounded-3xl p-6">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-white text-xl font-bold">
                                Pedidos em Tempo Real
                            </h2>

                            <p className="text-zinc-400 text-sm mt-1">
                                Acompanhe os pedidos em andamento
                            </p>
                        </div>

                        <Activity className="text-orange-400" />
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between border border-white/5 bg-white/2 rounded-2xl px-5 py-4">
                            <div>
                                <h3 className="text-white font-semibold">
                                    Pedido #1024
                                </h3>

                                <p className="text-zinc-400 text-sm">
                                    Mesa 2 • João
                                </p>
                            </div>

                            <span className="text-yellow-400 font-medium">
                                Em preparo
                            </span>
                        </div>

                        <div className="flex items-center justify-between border border-white/5 bg-white/2 rounded-2xl px-5 py-4">
                            <div>
                                <h3 className="text-white font-semibold">
                                    Pedido #1025
                                </h3>

                                <p className="text-zinc-400 text-sm">
                                    Mesa 4 • Maria
                                </p>
                            </div>

                            <span className="text-green-400 font-medium">
                                Pronto
                            </span>
                        </div>

                        <div className="flex items-center justify-between border border-white/5 bg-white/2 rounded-2xl px-5 py-4">
                            <div>
                                <h3 className="text-white font-semibold">
                                    Pedido #1026
                                </h3>

                                <p className="text-zinc-400 text-sm">
                                    Mesa 1 • Carlos
                                </p>
                            </div>

                            <span className="text-cyan-400 font-medium">
                                Recebido
                            </span>
                        </div>

                        <div className="flex items-center justify-between border border-white/5 bg-white/2 rounded-2xl px-5 py-4">
                            <div>
                                <h3 className="text-white font-semibold">
                                    Pedido #1027
                                </h3>

                                <p className="text-zinc-400 text-sm">
                                    Mesa 3 • Ana
                                </p>
                            </div>

                            <span className="text-yellow-400 font-medium">
                                Em preparo
                            </span>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-5">
                    {/* Ações Rápidas */}
                    <div className="bg-white/3 border border-white/10 rounded-3xl p-6">
                        <h2 className="text-white text-xl font-bold mb-6">
                            Ações Rápidas
                        </h2>

                        <div className="space-y-4">
                            <button className="w-full bg-orange-500 hover:bg-orange-400 transition text-white font-semibold rounded-2xl py-4">
                                + Novo Produto
                            </button>

                            <button className="w-full bg-white/5 hover:bg-white/10 transition text-white font-medium rounded-2xl py-4 border border-white/10">
                                + Nova Mesa
                            </button>

                            <button className="w-full bg-white/5 hover:bg-white/10 transition text-white font-medium rounded-2xl py-4 border border-white/10">
                                Ver Pedidos
                            </button>

                            <button className="w-full bg-white/5 hover:bg-white/10 transition text-white font-medium rounded-2xl py-4 border border-white/10">
                                Gerenciar Estoque
                            </button>
                        </div>
                    </div>

                    {/* Alertas */}
                    <div className="bg-white/3 border border-white/10 rounded-3xl p-6">
                        <div className="flex items-center gap-3 mb-5">
                            <AlertTriangle
                                size={22}
                                className="text-yellow-400"
                            />

                            <h2 className="text-white text-xl font-bold">
                                Alertas
                            </h2>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-black/20 border border-white/5 rounded-2xl p-4">
                                <p className="text-zinc-300 text-sm">
                                    Estoque de Pastel abaixo de 10 unidades.
                                </p>
                            </div>

                            <div className="bg-black/20 border border-white/5 rounded-2xl p-4">
                                <p className="text-zinc-300 text-sm">
                                    7 pedidos aguardando preparo.
                                </p>
                            </div>

                            <div className="bg-black/20 border border-white/5 rounded-2xl p-4">
                                <p className="text-zinc-300 text-sm">
                                    Mesa 4 aguardando entrega.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Produtos Mais Vendidos */}
            <div className="bg-white/3 border border-white/10 rounded-3xl p-6">
                <h2 className="text-white text-xl font-bold mb-6">
                    Produtos Mais Vendidos Hoje
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-black/20 border border-white/5 rounded-2xl p-5">
                        <h3 className="text-white font-semibold">
                            Coxinha
                        </h3>

                        <p className="text-zinc-400 mt-2">
                            48 unidades vendidas
                        </p>
                    </div>

                    <div className="bg-black/20 border border-white/5 rounded-2xl p-5">
                        <h3 className="text-white font-semibold">
                            Pastel
                        </h3>

                        <p className="text-zinc-400 mt-2">
                            35 unidades vendidas
                        </p>
                    </div>

                    <div className="bg-black/20 border border-white/5 rounded-2xl p-5">
                        <h3 className="text-white font-semibold">
                            Café Preto
                        </h3>

                        <p className="text-zinc-400 mt-2">
                            22 unidades vendidas
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}