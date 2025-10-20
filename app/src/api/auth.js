import api from "../services/api";


const AUTH_ROUTE = "/auth";


// Login request
export async function loginUser({ username, password }) {
    
    const answer = {
        success: false,
        message: "",
        data: null
    }

    try {
        const response = await api.post(`${AUTH_ROUTE}/login`, {
            username: username,
            pwd: password
        })

        answer.success = true;
        answer.data = response.data

    } catch (err) {
        answer.success = false

        if (err.response) {
            const code = err.response.status;
            answer.message = code < 500 ? "Incorrect username or password!" : "Server error, try again later.";
        } else if (err.request) {
            answer.message = "Unable to connect to server.";
        } else {
            answer.message = err.message;
        }
    }

    return answer;
}


export async function registerUser({
    username, email, name, surname, password
}) {

    const answer = {
        success: false,
        message: "",
        data: null
    }

    try {
        const response = await api.post(`${AUTH_ROUTE}/register`, {
            username: username,
            email: email,
            name: name,
            surname: surname,
            pwd: password
        })

        answer.success = true;
        answer.data = response.data;

    } catch (err) {
        if (err.response) {
            const code = err.response.status;

            if (code == 409) {
                const msg = err.response.data.detail;

                if (msg.toLowerCase().includes("email")) {
                    answer.message = "Email already exists!"
                } else {
                    answer.message = "Username already exists!"
                }

            } else if (code < 500) {
                answer.message = "Invalid request!";
            } else {
                answer.message = "Server error, try again later.";
            }
        } else if (err.request) {
            answer.message = "Unable to connect to server."
        } else {
            answer.message = err.message;
        }
    }

    return answer;
}