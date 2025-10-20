import api from "../services/api";


const VOUCHER_ROUTE = "/vouchers"


export async function redeemCode(code) {
    const response = await api.post(`${VOUCHER_ROUTE}/redeem/${code}`);
    return response.data;
}
