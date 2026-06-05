import { useState } from "react";

export function useMenu() {

    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(1);

    return {
        search,
        setSearch,
        selectedCategory,
        setSelectedCategory
    };
}