export default function Categories({
    categories,
    selected,
    onSelect
}) {
    return (
        <div className="flex gap-3 overflow-x-auto px-4 pb-4">

            {categories.map(category => (

                <button
                    key={category.id}
                    onClick={() => onSelect(category.id)}
                    className={
                        selected === category.id
                            ? "px-5 py-2 rounded-full bg-linear-to-r from-amber-500 to-red-500 text-black font-semibold whitespace-nowrap"
                            : "px-5 py-2 rounded-full bg-stone-900 text-stone-300 border border-stone-700 whitespace-nowrap"
                    }
                >
                    {category.name}
                </button>

            ))}

        </div>
    );
}