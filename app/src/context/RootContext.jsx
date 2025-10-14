import { UserProvider } from "./UserContext";
import { AuthProvider } from "./AuthContext";


export function RootProvider({ children }) {
  return (
    <AuthProvider>
        <UserProvider>
            {children}
        </UserProvider>
    </AuthProvider>
  );
}