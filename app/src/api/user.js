import api from "../services/api";


const USER_ROUTE = "/users";


export async function getMe() {

    const response = await api.get(`${USER_ROUTE}/me`);
    sessionStorage.setItem("lastUsername", response.data.username);
    return response.data;
}


export async function updatePwd(current_pwd, new_pwd) {
    const response = await api.patch(`${USER_ROUTE}/change-password`,
        {
            current_pwd, new_pwd
        }
    )

    return response.data;
}
