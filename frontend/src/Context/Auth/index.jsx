import { createContext, useContext, useState } from "react"
import { ConfigContext } from './../Config/Index'
import { useNavigate } from "react-router-dom";


export const AutContext = createContext();

export default function AuthProvider(props) {

    const initialUser = localStorage.getItem('user');
    let { api_urls } = useContext(ConfigContext);
    const [user, setUser] = useState(JSON.parse(initialUser));
    const navigate = useNavigate()

    //prende i parametri 
    const login = (username, token, id) => {
        const obj = {
            username: username,
            token: token,
            id: id
        }
        // li setta
        setUser(obj);
        //li scrive nel localStorage
        localStorage.setItem('user', JSON.stringify(obj));
    };
    //aggiorna i parametri
    const Update = (username, token, id) => {
        const obj = {
            username: username,
            token: token,
            id: id
        }
        // li setta
        setUser(obj);
        //li scrive nel localStorage
        localStorage.setItem('user', JSON.stringify(obj));
    };

    //logout
    const logout = () => {
        fetch(`${api_urls.backend}/api/users/logout`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${user.token}`,
            }
        })
            .then(() => {
                localStorage.removeItem("user");
                setUser(null);
                navigate("/")
            });
    }

    return (

        <AutContext.Provider value={{ login, user, logout, Update }}>{props.children}</AutContext.Provider>
    )
}
