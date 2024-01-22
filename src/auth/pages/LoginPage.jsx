import { useContext } from "react";
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../";

export const LoginPage = () => {

    const navigate = useNavigate();

    const {login} = useContext(AuthContext);

    // *Nota el "replace" evita que se pueda volver al historial anterior
    const onLogin = ()=>{

        const lastPath = localStorage.getItem('lastPath') || '/'

        login('Jose Maiz');

        navigate(lastPath, {
            replace: true
        })
    }

    return (

        <div className="container mt-5">
            <h1>Login</h1>
            <hr />

            <button
                className="btn btn-primary"
                onClick={onLogin}
            >
                Login
            </button>
        </div>

    )
}


