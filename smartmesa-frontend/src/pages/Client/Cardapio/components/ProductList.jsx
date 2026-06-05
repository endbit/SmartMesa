import ProductCard from "./ProductCard";

export default function ProductList({
    products,
    onAdd
}) {
    return (
        <div className="px-4 space-y-5">

            {products.map(product => (
                <ProductCard
                    key={product.id}
                    product={product}
                    onAdd={onAdd}
                />
            ))}

        </div>
    );
}