import { useLocation } from "react-router-dom";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Categories from "./components/Categories";
import ProductList from "./components/ProductList";
import CartButton from "./components/CartButton";
import CartModal from "./components/CartModal";
import { useMenu } from "./hooks";
import { productsMock } from "./mock";
import { useCart } from "../../../context/CartContext";
import { useState } from "react";

export default function Cardapio() {

    const location = useLocation();

    const name = location.state?.name || "Cliente";

    const tableNumber = location.state?.tableNumber;

    const { search, setSearch, selectedCategory, setSelectedCategory } = useMenu();

    const { addItem, totalItems, totalPrice } = useCart();

    const [cartOpen, setCartOpen] = useState(false);

    return (
        <div className="min-h-screen bg-linear-to-br from-zinc-950 via-stone-900 to-neutral-950 pb-32">

            <Header
                name={name}
                tableNumber={tableNumber}
            />

            <SearchBar
                value={search}
                onChange={(e) =>
                    setSearch(e.target.value)
                }
            />

            <Categories
                selected={selectedCategory}
                onSelect={setSelectedCategory}
                categories={[
                    {
                        id: 1,
                        name: "🍟 Salgados"
                    },
                    {
                        id: 2,
                        name: "🥤 Bebidas"
                    },
                    {
                        id: 3,
                        name: "🍔 Lanches"
                    }
                ]}
            />

            <ProductList
                products={productsMock}
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