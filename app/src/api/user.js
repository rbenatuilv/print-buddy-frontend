import api from "../services/api";


const USER_ROUTE = "/users";


export async function getMe() {

    const response = await api.get(`${USER_ROUTE}/me`);
    sessionStorage.setItem("lastUsername", response.data.username);
    return response.data;
}