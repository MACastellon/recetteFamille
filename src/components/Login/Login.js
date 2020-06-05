import React, {useState} from "react";
import axios from 'axios';



const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const submit = (e) => {
        e.preventDefault();
        const data = {
            username : username,
            password : password
        }
        console.log(data);
        axios.post("http://localhost:5000/users/login", data)
            .then((res) => console.log(res.data))
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
            </form>
        </>
    )
}
export default Login;