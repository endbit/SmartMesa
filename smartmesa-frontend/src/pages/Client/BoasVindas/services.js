import api from "../../../api/api";

export async function getTableByToken(token) {
    const response = await api.get(
        `/tables/token/${token}`
    );

    return response.data;
}

export async function checkActiveOrder(tableNumber) {
    try {

        await api.get(
            `/orders/table/${tableNumber}/active`
        );

        return true;

    } catch (error) {

        if (error?.response?.status === 404) {
            return false;
        }

        throw error;
    }
}

export async function openOrder(
    customerName,
    tableNumber
) {
    const response = await api.post(
        "/orders/open",
        {
            customerName,
            tableNumber
        }
    );

    return response.data;
}