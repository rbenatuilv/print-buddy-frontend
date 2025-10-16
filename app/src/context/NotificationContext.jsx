import { SnackbarProvider } from "notistack";


export function NotifProvider({ children }) {
    return (
        <SnackbarProvider
            maxSnack={5}                       // Máximo número de snackbars visibles
            anchorOrigin={{ vertical: "top", horizontal: "right" }} 
            autoHideDuration={4000}            // Duración automática
            hideIconVariant={false}            // Muestra icono según tipo
        >
            { children }
        </SnackbarProvider>
    );
}