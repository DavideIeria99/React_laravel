import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AutContext } from "../../Context/Auth";


const ProtectedRoute = () => {
    const { user } = useContext(AutContext);



    return user ? (
        <Outlet />
    ) : (
        <Navigate to="/Sign" replace />
    );
}

export default ProtectedRoute;