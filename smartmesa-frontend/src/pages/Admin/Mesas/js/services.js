import api from "@/api/api"

export async function CarregarMesas() {
    
    try{
        const response = await api.get("/tables")
        return response.data;
    }catch(error){
        console.error(error);
        return [];
    }
}

export async function CriarNovaMesa(data) {
    try {
        const response = await api.post("/tables", data);
        return response.data;
    } catch (error) {
        console.error("Erro ao criar mesa:", error);
        throw error;
    }
}