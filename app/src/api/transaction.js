import api from "../services/api"


const TX_ROUTE = "/transactions"


export async function getMyTransactions() {
    const response = await api.get(`${TX_ROUTE}/me`)
    return response.data;
}
