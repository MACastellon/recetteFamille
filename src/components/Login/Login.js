import React, {useContext, useState} from "react";
import AuthContext from "../../contexts/AuthContext";

const Login = (props) => {
    const {loginFn, logoutFn, currentUser} = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const submit = async (e) => {
        e.preventDefault();
        const data = {
            username : username,
            password : password
        }
        await  loginFn(data)
    }
    return (
        <>
            <form action="POST" onSubmit={(e) => submit(e)}>
                <div>
                    <input type="text" placeholder={"nom d'utilisateur"} onChange={(e) =>{e.preventDefault(); setUsername(e.target.value)}} />
                </div>
                <div>
                    <input type="password" placeholder={"Mot de passe"} onChange={(e) => {e.preventDefault(); setPassword(e.target.value)}}/>
                </div>
                <input type="submit" value={"Se Connecter"}/>
                {currentUser != null ? ("Bonjour " + currentUser.username + " ton id est " + currentUser._id) : ("Pas connecter")}
            </form>

        </>
    )
}
export default Login;