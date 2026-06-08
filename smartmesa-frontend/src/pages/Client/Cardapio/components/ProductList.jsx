import ProductCard from "./ProductCard";

export default function ProductList({
    products,
    categories,
    search,
    selectedCategory,
    onAdd,
    onSelectProduct
}) {
    return (
        <div className="px-4">

            {categories.map(category => {

                const items = products.filter(p => {

                    const matchSearch =
                        !search ||
                        p.nome.toLowerCase().includes(search.toLowerCase());

                    const belongsToCategory =
                        p.category?.id === category.id;

                    const matchSelectedCategory =
                        !selectedCategory || selectedCategory === category.id;

                    return matchSearch && belongsToCategory && matchSelectedCategory;
                });

                if (items.length === 0) return null;

                return (
                    <div key={category.id} className="mb-8">

                        {/* 🏷️ título */}
                        <h2 className="text-white font-bold text-lg px-4 mb-2">
                            {category.nome}
                        </h2>

                        {/* 📦 scroll */}
                        <div className="flex gap-4 overflow-x-auto pb-3 scroll-smooth">

                            {items.map(product => (
                                <div
                                    key={product.id}
                                    className="shrink-0 w-56 h-full animate-fade-in"
                                >
                                    <ProductCard
                                        product={product}
                                        onAdd={onAdd}
                                        onClick={() => onSelectProduct(product)}
                                    />
                                </div>
                            ))}

                        </div>

                    </div>
                );
            })}

        </div>
    );
}