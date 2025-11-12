import api from "../services/api";

const APP_ROUTE = "";

export async function getAppInfo() {
    console.log(`${APP_ROUTE}/version`)
    const response = await api.get(`${APP_ROUTE}/version`);
    return response.data;
}
