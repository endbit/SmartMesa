export default function Header({
    tableNumber,
    name
}) {
    return (
        <div className="sticky top-0 z-40 backdrop-blur-xl bg-stone-950/70 border-b border-stone-800 px-4 py-4">

            <h1 className="text-amber-100 text-xl font-bold">
                SmartMesa 🍷
            </h1>

            <p className="text-stone-400 text-sm mt-1">
                Mesa {tableNumber} • Bem-vindo, {name}
            </p>

        </div>
    );
}