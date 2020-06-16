import React, {useContext, useState} from "react";
import axios from "axios";
import AuthContext from "../../../contexts/AuthContext";


const CreateUser = (props) => {

    const {currentUser} = useContext(AuthContext);
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const [role, setRole] = useState("user")

    const onSubmitUser = (e) => {
        e.preventDefault();
        const data = {
            firstName : firstName,
            lastName : lastName,
            username : username,
            password: password,
            password2 : password2,
            role : role
        }

        axios.post("http://localhost:5000/users/register",data)
            .then(res => {
                console.log(res.data)
                if (res.data.success) props.history.push("/utilisateur/tableau-de-bord")

            })
        console.log(data)
    }

    return (
        <form action="POST" onSubmit={(e) => onSubmitUser(e)}>
            <h4>Prénom</h4>
            <input type="text" placeholder={"Prénom"} onChange={(e) => {e.preventDefault(); setFirstName(e.target.value)}} />
            <h4>Nom de famille</h4>
            <input type="text" placeholder={"Nom de famille"} onChange={(e) => {e.preventDefault(); setLastName(e.target.value)}} />
            <h4>Nom d'utilisateur</h4>
            <input type="text" placeholder={"Nom d'utilisateur"} onChange={(e) => {e.preventDefault(); setUsername(e.target.value)}} />
            <h4>Mot de passe</h4>
            <input type="password" placeholder={"Mot de passe"} onChange={(e) => {e.preventDefault(); setPassword(e.target.value)}}/>
            <h4>Confirmez le mot de passe</h4>
            <input type="password" placeholder={"Mot de passe"} onChange={(e) => {e.preventDefault(); setPassword2(e.target.value)}}/>
            <div>
                <h4>Role</h4>
                <select name="role"  onChange={(e) => {e.persist(); setRole(e.target.value)}}>
                    <option value="user">utilisateur</option>
                    {currentUser.role === "admin" ? (
                        <option value="moderator">moderateur</option>
                    ) : (
                        null
                    )}
                </select>
            </div>

            <div>
                <input type="submit" value={"Créer"}/>
            </div>

        </form>
    )
}

export default CreateUser;