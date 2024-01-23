
import { createContext } from "react";

export const ConfigContext = createContext();

export function ConfigProvider(props) {

    const api_urls = {
        games: import.meta.env.VITE_RAWG_API_URL,
        backend: import.meta.env.VITE_REACT_APP_URL,
    };

    const api_secrets = {
        games: import.meta.env.VITE_RAWG_API_KEY,
    }

    return (<ConfigContext.Provider value={{ api_urls, api_secrets }}>{props.children}</ConfigContext.Provider>);
}
