import api from "../../../api/api";

export default async function getProducts() {
    try {
        const response = await api.get("/products");
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        throw error;
    }
}