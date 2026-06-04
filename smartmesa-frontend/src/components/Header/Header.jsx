import { useLocation } from "react-router-dom";

import {
    Bell,
    Search,
    Menu,
} from "lucide-react";

export default function Header({
    setSidebarOpen,
}) {
    const location = useLocation();

    const titles = {
        "/": "Dashboard",
        "/site": "Site",
        "/produtos": "Produtos",
        "/posts": "Posts",
        "/configuracoes": "Configurações",
    };

    const pageTitle =
        titles[location.pathname] || "Painel";

    return (
        <header className="h-20 lg:h-24 border-b border-white/10 bg-white/2 backdrop-blur-xl px-4 lg:px-8 flex items-center justify-between z-30">
            <div className="flex items-center gap-4">
                {/* Mobile Menu */}
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="lg:hidden w-11 h-11 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition"
                >
                    <Menu size={22} />
                </button>

                <div>
                    <h1 className="text-xl lg:text-2xl font-bold text-white">
                        {pageTitle}
                    </h1>

                    <p className="hidden md:block text-zinc-400 text-sm mt-1">
                        Gerencie sua plataforma com facilidade
                    </p>
                </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-3 lg:gap-4">
                {/* Search */}
                <div className="hidden xl:flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 h-12 w-72">
                    <Search
                        size={18}
                        className="text-zinc-500"
                    />

                    <input
                        type="text"
                        placeholder="Pesquisar..."
                        className="bg-transparent outline-none border-none text-white placeholder:text-zinc-500 w-full"
                    />
                </div>

                {/* Notification */}
                <button className="w-11 h-11 lg:w-12 lg:h-12 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition">
                    <Bell size={20} />
                </button>
            
            </div>
        </header>
    );
}