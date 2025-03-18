import { Provider } from "react-redux";
import { store } from "src/store/store";
// import { StoreProvider } from "./StoreProvider";
import { ThemeProvider } from "./theme-provider";
import { BrowserRouter } from 'react-router-dom'

export const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <ThemeProvider defaultTheme="system" storageKey="theme" >
            <BrowserRouter>
                <Provider store={store}>
                    {children}
                </Provider>
            </BrowserRouter>
        </ThemeProvider>
    );
};
