import { createContext, useContext, useState } from "react"
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"

import { getMyTransactions } from "../api/transaction"
import { redeemCode } from "../api/vouchers"


const TransactionContext = createContext(null)


export function TransactionProvider({ children }) {
    const queryTx = useQuery({
        queryKey: ["tx"],
        queryFn: getMyTransactions,
        staleTime: 1000 * 60 * 5,
        retry: false
    })

    const { data: txs, isLoading, isError } = queryTx;

    const [ errorRedeem, setErrorRedeem ] = useState("");

    const queryClient = useQueryClient();
    const redeemMutation = useMutation({
        mutationFn: redeemCode,
        onSuccess: async () => {
            setErrorRedeem("");
            await queryClient.invalidateQueries(['user', 'tx']);
        },
        onError: (err) => {
            if (err.response) {
                const status = err.response.status;
                if (status == 404) {
                    setErrorRedeem("Voucher not found.");
                } else if (status == 403) {
                    setErrorRedeem("Voucher not redeemable.")
                } else {
                    setErrorRedeem("An error occurred.")
                }
            }
        }
    })

    const { isSuccess: isSuccessRedeem } = redeemMutation;

    const redeemVoucherCode = async (code) => {
        await redeemMutation.mutateAsync(code);
    }


    return (
        <TransactionContext.Provider value={{
            txs, isLoading, isError, redeemVoucherCode, 
            errorRedeem, isSuccessRedeem, setErrorRedeem
        }}>
            { children }
        </ TransactionContext.Provider>
    )
}

export function useTxs() {
    return useContext(TransactionContext)
}
