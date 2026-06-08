import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Categories from "./components/Categories";
import ProductList from "./components/ProductList";
import CartButton from "./components/CartButton";
import CartModal from "./components/CartModal";
import ProductModal from "./components/ProductModal";

import { useMenu } from "./hooks";
import { useCart } from "../../../context/CartContext";

import { useEffect, useState } from "react";
import { getProducts } from "../../Admin/Produtos/services";
import api from "../../../api/api";

export default function Cardapio() {

    // 🧠 sessão do cliente
    const name = sessionStorage.getItem("customerName") || "Cliente";
    const tableNumber = sessionStorage.getItem("tableNumber") || "—";
    const sessionToken = sessionStorage.getItem("sessionToken");

    const { search, setSearch, selectedCategory, setSelectedCategory } = useMenu();
    const { addItem, totalItems, totalPrice } = useCart();

    const [cartOpen, setCartOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // 🚀 produtos
    useEffect(() => {
        async function loadProducts() {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (err) {
                console.error("Erro produtos:", err);
            }
        }

        loadProducts();
    }, []);

    // 🚀 categorias
    useEffect(() => {
        async function loadCategories() {
            try {
                const res = await api.get("/categories");
                setCategories(res.data);
            } catch (err) {
                console.error("Erro categorias:", err);
            }
        }

        loadCategories();
    }, []);

    return (
        <div className="min-h-screen bg-linear-to-br from-zinc-950 via-stone-900 to-neutral-950 pb-32">

            <Header
                name={name}
                tableNumber={tableNumber}
                sessionToken={sessionToken}
            />

            <SearchBar
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <Categories
                selected={selectedCategory}
                onSelect={setSelectedCategory}
                categories={categories}
            />

            <ProductList
                products={products}
                categories={categories}
                search={search}
                selectedCategory={selectedCategory}   // 🔥 FALTAVA ISSO
                onAdd={addItem}
                onSelectProduct={setSelectedProduct}
            />

            <CartButton
                totalItems={totalItems}
                totalPrice={totalPrice}
                onClick={() => setCartOpen(true)}
            />

            <CartModal
                open={cartOpen}
                onClose={() => setCartOpen(false)}
            />

            {/* 🚀 MODAL DO PRODUTO */}
            <ProductModal
                product={selectedProduct}
                open={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
                onAdd={addItem}
            />

        </div>
    );
}