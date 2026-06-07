import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import PrivateLayout from "../components/PrivateLayout/PrivateLayout";

// ADMIN
import Dashboard from "../pages/Admin/Dashboard/Dashboard";
import Produtos from "../pages/Admin/Produtos/Produtos";
import Configuracoes from "../pages/Admin/Configuracoes/Configuracoes";
import Categorias from "../pages/Admin/Categorias/Categorias";
import Mesas from "../pages/Admin/Mesas/Mesas";
import Login from "../pages/Admin/Login/Login";
import Pedidos from "../pages/Admin/Pedidos/Pedidos";
import FormasDePagamento from "../pages/Admin/FormasDePagamento/FormasDePagamento";

// SECURITY
import AdminRoute from "../security/AdminRoute";

// CLIENTE
import BoasVindas from "../pages/Client/BoasVindas/BoasVindas";
import Cardapio from "../pages/Client/Cardapio/Cardapio";
import Pagamento from "../pages/Client/Pagamento/Pagamento";
import Sucesso from "../pages/Client/Sucesso/Sucesso";
import AcompanharPedido from "../pages/Client/AcompanharPedido/AcompanharPedido";
import Carrinho from "../pages/Client/Carrinho/Carrinho";

export default function AppRoutes() {
    const isLogged = !!localStorage.getItem("token");

    return (
        <Router>
            <Routes>

                {/* 🔁 ROOT REDIRECT INTELIGENTE */}
                <Route
                    path="/"
                    element={
                        isLogged
                            ? <Navigate to="/admin/dashboard" replace />
                            : <Navigate to="/admin/login" replace />
                    }
                />

                {/* 🔐 LOGIN (fora do guard) */}
                <Route path="/admin/login" element={<Login />} />

                {/* 🔐 ADMIN PROTEGIDO */}
                <Route element={<AdminRoute />}>
                    <Route element={<PrivateLayout />}>

                        <Route path="/admin/dashboard" element={<Dashboard />} />
                        <Route path="/admin/formasdepagamento" element={<FormasDePagamento />} />
                        <Route path="/admin/pedidos" element={<Pedidos />} />
                        <Route path="/admin/categorias" element={<Categorias />} />
                        <Route path="/admin/produtos" element={<Produtos />} />
                        <Route path="/admin/configuracoes" element={<Configuracoes />} />
                        <Route path="/admin/mesas" element={<Mesas />} />

                    </Route>
                </Route>

                {/* 🍽️ CLIENTE */}
                <Route path="/menu/:sessionToken" element={<BoasVindas />} />
                <Route path="/menu/:sessionToken/cardapio" element={<Cardapio />} />
                <Route path="/menu/:sessionToken/carrinho" element={<Carrinho />} />
                <Route path="/menu/:sessionToken/pagamento" element={<Pagamento />} />
                <Route path="/menu/:sessionToken/sucesso" element={<Sucesso />} />
                <Route path="/menu/:sessionToken/acompanharpedido" element={<AcompanharPedido />} />

            </Routes>
        </Router>
    );
}