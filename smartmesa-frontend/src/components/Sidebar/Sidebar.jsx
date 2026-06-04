import {
    LayoutDashboard,
    Package,
    ClipboardList,
    Tags,
    UtensilsCrossed,
    Warehouse,
    Receipt,
    Users,
    FileText,
    ChevronRight,
    Settings,
    X,
} from "lucide-react";

import { NavLink } from "react-router-dom";

export default function Sidebar({
    sidebarOpen,
    setSidebarOpen,
}) {
const menu = [
    {
        name: "Dashboard",
        icon: LayoutDashboard,
        path: "/",
    },
    {
        name: "Pedidos",
        icon: ClipboardList,
        path: "/admin/pedidos",
    },
    {
        name: "Produtos",
        icon: Package,
        path: "/admin/produtos",
    },
    {
        name: "Categorias",
        icon: Tags,
        path: "/admin/categorias",
    },
    {
        name: "Mesas",
        icon: UtensilsCrossed,
        path: "/admin/mesas",
    },
    {
        name: "Formas de Pagamento",
        icon: FileText,
        path: "/admin/formasdepagamento",
    },
    {
        name: "Relatórios",
        icon: Receipt,
        path: "/admin/relatorios",
    },
    {
        name: "Usuários",
        icon: Users,
        path: "/admin/usuarios",
    },
    {
        name: "Configurações",
        icon: Settings,
        path: "/admin/configuracoes",
    },
];

    return (
        <>
            {/* Overlay Mobile */}
            <div
                onClick={() => setSidebarOpen(false)}
                className={`
                    fixed inset-0 bg-black/60 z-40 lg:hidden
                    transition-all duration-300
                    ${
                        sidebarOpen
                            ? "opacity-100 visible"
                            : "opacity-0 invisible"
                    }
                `}
            />

            <aside
                className={`
                    fixed lg:sticky top-0 left-0 z-50
                    h-full w-72
                    bg-gray-800 border-r border-white/10
                    flex flex-col justify-between
                    p-3
                    transition-transform duration-300

                    ${
                        sidebarOpen
                            ? "translate-x-0"
                            : "-translate-x-full lg:translate-x-0"
                    }
                `}
            >
                <div>
                    {/* Logo */}
                    <div className="flex items-center justify-between mb-12">
                        <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-2xl bg-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                                <span className="text-black font-black text-lg">
                                    E
                                </span>
                            </div>

                            <div>
                                <h1 className="text-white font-bold text-lg leading-none">
                                    Empresa
                                </h1>

                                <span className="text-zinc-400 text-sm">
                                    Painel Administrativo
                                </span>
                            </div>
                        </div>

                        {/* Close Mobile */}
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden text-zinc-400 hover:text-white transition"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Menu */}
                    <nav className="space-y-2">
                        {menu.map((item, index) => {
                            const Icon = item.icon;

                            return (
                                <NavLink
                                    key={index}
                                    to={item.path}
                                    onClick={() =>
                                        setSidebarOpen(false)
                                    }
                                    className={({ isActive }) =>
                                        `group w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-300 ${
                                            isActive
                                                ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/20"
                                                : "text-zinc-400 hover:bg-white/5 hover:text-white"
                                        }`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            <div className="flex items-center gap-3">
                                                <Icon size={20} />

                                                <span className="font-medium">
                                                    {item.name}
                                                </span>
                                            </div>

                                            <ChevronRight
                                                size={18}
                                                className={`transition-transform duration-300 ${
                                                    isActive
                                                        ? "translate-x-1"
                                                        : "opacity-0 group-hover:opacity-100 group-hover:translate-x-1"
                                                }`}
                                            />
                                        </>
                                    )}
                                </NavLink>
                            );
                        })}
                    </nav>
                </div>

                {/* Bottom */}
                <div className="space-y-4">
                    {/* Usuário */}
                    <div className="border border-white/10 bg-white/5 rounded-3xl p-4 backdrop-blur-xl">
                        <div className="flex items-center gap-3">
                            <img
                                src="https://i.pravatar.cc/100"
                                alt="Usuário"
                                className="w-12 h-12 rounded-2xl object-cover"
                            />

                            <div className="flex-1">
                                <h3 className="text-white font-semibold">
                                    Admin
                                </h3>

                                <p className="text-zinc-400 text-sm">
                                    Administrador
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Desenvolvido por */}
                    <div className="border border-white/10 bg-white/3 rounded-2xl px-4 py-3 backdrop-blur-xl">
                        <p className="text-zinc-500 text-sm text-center">
                            Desenvolvido por{" "}
                            <span className="text-cyan-400 font-semibold">
                                AlturionX
                            </span>
                        </p>
                    </div>
                </div>
            </aside>
        </>
    );
}