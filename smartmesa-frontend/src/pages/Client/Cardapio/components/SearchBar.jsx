import { Search } from "lucide-react";

export default function SearchBar({
    value,
    onChange
}) {
    return (
        <div className="p-4">

            <div className="relative">

                <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500"
                />

                <input
                    value={value}
                    onChange={onChange}
                    placeholder="Buscar pratos, bebidas..."
                    className="w-full h-14 pl-12 pr-4 rounded-2xl bg-stone-900/60 border border-stone-700 text-amber-50"
                />

            </div>

        </div>
    );
}