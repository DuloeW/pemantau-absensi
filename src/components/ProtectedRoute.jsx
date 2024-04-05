import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import Cookies from "js-cookie";

const ProtectedRoute = ({children}) => {
    const navigate = useNavigate();
    const token = Cookies.get('token-pantau')
    useEffect(() => {
        if (token === undefined) {
            navigate('/login', {replace: true})
        }
    },[navigate, token])

    return children
}

export default ProtectedRoute;