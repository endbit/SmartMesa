import api from "../../../api/api";

const API_URL = "/categories";

/* Buscar Categorias */
export async function getCategories() {
    try {
        const response = await api.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar categorias:", error);
        throw error;
    }
}

/* Criar Categoria */
export async function createCategory(category) {
    const response = await api.post(API_URL, category);
    return response.data;
}

/* Excluir Categoria */
export async function deleteCategory(categoryId) {
    await api.delete(`${API_URL}/${categoryId}`);
}