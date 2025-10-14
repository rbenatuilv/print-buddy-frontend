import api from "../services/api";


const USER_ROUTE = "/users";


export async function getMe() {

    const answer = {
        success: false,
        message: "",
        data: null
    }

    try {
        const response = await api.get(`${USER_ROUTE}/me`);

        answer.success = true;
        answer.data = response.data;
    } catch (err) {
        answer.success = false;
    }

    return answer;
    
}