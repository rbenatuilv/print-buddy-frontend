import { UserProvider } from "./UserContext";
import { AuthProvider } from "./AuthContext";
import { QueryContext } from "./QueryContext";


export function RootProvider({ children }) {
    return (
        <QueryContext>
            <AuthProvider>
                <UserProvider>
                    {children}
                </UserProvider>
            </AuthProvider>
        </QueryContext>
    );
    }