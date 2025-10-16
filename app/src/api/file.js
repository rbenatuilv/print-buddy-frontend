import api from "../services/api";


const FILE_ROUTE = "/files"


export async function getFiles() {
    const response = await api.get(`${FILE_ROUTE}`);

    return response.data;
}


export async function uploadFile(file) {
    const formData = new FormData();

    formData.append('file', file);

    const response = await api.post(`${FILE_ROUTE}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })

    return response.data

}


export async function deleteFile(fileId) {
    const response = api.delete(`${FILE_ROUTE}/${fileId}`);
    return response.data
}