import { useLocation } from "react-router-dom";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Categories from "./components/Categories";
import ProductList from "./components/ProductList";
import CartButton from "./components/CartButton";
import CartModal from "./components/CartModal";
import { useMenu } from "./hooks";
import { useCart } from "../../../context/CartContext";
import { useEffect, useState } from "react";
import { getProducts } from "../../Admin/Produtos/services";
import api from "../../../api/api";

export default function Cardapio() {

    const location = useLocation();

    const name = location.state?.name || "Cliente";
    const tableNumber = location.state?.tableNumber;

    const { search, setSearch, selectedCategory, setSelectedCategory } = useMenu();
    const { addItem, totalItems, totalPrice } = useCart();

    const [cartOpen, setCartOpen] = useState(false);

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    // 🔥 LOAD PRODUTOS
    useEffect(() => {
        async function loadProducts() {
            try {
                const data = await getProducts();
                setProducts(data);
                setFilteredProducts(data);
            } catch (error) {
                console.error("Erro ao carregar produtos:", error);
            }
        }

        loadProducts();
    }, []);

    // 🔥 LOAD CATEGORIAS (BACKEND)
    useEffect(() => {
        async function loadCategories() {
            try {
                const response = await api.get("/categories");
                setCategories(response.data);
            } catch (error) {
                console.error("Erro ao carregar categorias:", error);
            }
        }

        loadCategories();
    }, []);

    // 🔥 FILTRO (categoria + search)
    useEffect(() => {

        let filtered = [...products];

        // categoria
        if (selectedCategory) {
            filtered = filtered.filter(
                (p) => p.category?.id === selectedCategory
            );
        }

        // search
        if (search) {
            filtered = filtered.filter((p) =>
                p.nome.toLowerCase().includes(search.toLowerCase())
            );
        }

        // 🔥 animação suave (delay leve pra UX)
        const timeout = setTimeout(() => {
            setFilteredProducts(filtered);
        }, 120);

        return () => clearTimeout(timeout);

    }, [selectedCategory, search, products]);

    return (
        <div className="min-h-screen bg-linear-to-br from-zinc-950 via-stone-900 to-neutral-950 pb-32">

            <Header
                name={name}
                tableNumber={tableNumber}
            />

            <SearchBar
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {/* 🔥 CATEGORIAS DO BACKEND */}
            <Categories
                selected={selectedCategory}
                onSelect={setSelectedCategory}
                categories={categories}
            />

            {/* 🔥 LISTA FILTRADA */}
            <ProductList
                products={filteredProducts}
                onAdd={addItem}
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

        </div>
    );
}