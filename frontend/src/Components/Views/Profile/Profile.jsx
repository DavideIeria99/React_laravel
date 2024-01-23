import { useContext } from "react";
import { AutContext } from "../../../Context/Auth"


export default function Profile() {
    const { user } = useContext(AutContext);
    return (
        <div className="container mt-5 min-vh-100">
            <div className="row min-vh-100 mt-5">
                <div className="col-12">
                    <h3>bentornato {user.username}</h3>
                </div>
                <div className="col-12">
                    statistiche utente
                </div>
            </div>
        </div>
    )
}
