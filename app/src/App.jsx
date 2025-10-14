import { RootProvider } from "./context/RootContext";
import AppRouter from "./Router"


function App() {

    return (
        <RootProvider>
            <AppRouter />
        </RootProvider>
    )
}

export default App;
