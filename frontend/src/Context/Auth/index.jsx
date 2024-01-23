import { createContext, useContext, useState } from "react"
import { ConfigContext } from './../Config/Index'
import { useNavigate } from "react-router-dom";


export const AutContext = createContext();

export default function AuthProvider(props) {

    const initialUser = localStorage.getItem('user');
    const initialComment = localStorage.getItem('comment');
    let { api_urls } = useContext(ConfigContext);
    const [user, setUser] = useState(JSON.parse(initialUser));
    const [comment, setComment] = useState(JSON.parse(initialComment));
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
    const userComment = (username, message, id) => {
        const obj = {
            username: username,
            message: message,
            id: id
        }
        // li setta
        setComment(obj);
        //li scrive nel localStorage
        localStorage.setItem('comment', JSON.stringify(obj));
    };

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

        <AutContext.Provider value={{ login, user, logout, comment, userComment }}>{props.children}</AutContext.Provider>
    )
}
