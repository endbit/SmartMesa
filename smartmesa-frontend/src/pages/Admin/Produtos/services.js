import api from "../../../api/api";

export async function getProducts() {
    try {
        const response = await api.get("/products");
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        throw error;
    }
}

export async function createProduct(formData) {
    try {
        const response = await api.post("/products", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data;

    } catch (error) {
        console.error("Erro ao criar produto:", error);
        throw error;
    }
}