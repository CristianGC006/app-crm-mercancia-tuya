import { Navigate } from "react-router-dom";

const RouterProtected=({proteger})=>{
    let token = localStorage.getItem("token");
    return token?proteger:<Navigate to="/" />;
}
export default RouterProtected;