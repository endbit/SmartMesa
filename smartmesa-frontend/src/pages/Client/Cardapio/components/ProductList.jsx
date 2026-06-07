import ProductCard from "./ProductCard";

export default function ProductList({ products, onAdd }) {
    return (
        <div className="px-4 space-y-5 transition-all duration-300">

            {products.map(product => (
                <div
                    key={product.id}
                    className="animate-fade-in"
                >
                    <ProductCard
                        product={product}
                        onAdd={onAdd}
                    />
                </div>
            ))}

        </div>
    );
}