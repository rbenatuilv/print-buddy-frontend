import axios from "axios";


const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


let authExpiredCallback = null;

export function setAuthExpiredCallback(cb) {
    authExpiredCallback = cb;
}

api.interceptors.response.use(
    res => res,
    err => {
        if (err.response?.status === 401) {
            if (typeof authExpiredCallback === 'function') authExpiredCallback();
        }
        return Promise.reject(err);
    }
);

export default api;
