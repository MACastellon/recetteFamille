import React, {useContext, useEffect, useState} from "react";
import AuthContext from "../../contexts/AuthContext";
import axios from "axios";
import {Link} from "react-router-dom";
import {Tab, Tabs, Button} from "react-bootstrap";

const Dashboard = () => {
    const {currentUser} = useContext(AuthContext);

    const [userRecipes, setUserRecipes] = useState(null)
    const [users, setUsers] = useState(null)
    const [key, setKey] = useState('home');
    const  [success, setSucces] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const [role, setRole] = useState("user")

    useEffect( () => {
        const data = {
            id : currentUser._id
        }
        axios.get("http://localhost:5000/users/"+currentUser._id+"/recipes")
            .then((res) => {
                setUserRecipes(res.data);
                console.log(res.data)
            })

        axios.get("http://localhost:5000/users")
            .then((res) => {
                setUsers(res.data);
                console.log(res.data)
            })
    },[success])

    const deleteRecipe = (e, id, index) => {
        e.preventDefault();
        axios.delete("http://localhost:5000/recipes/delete/"+ id)
            .then((res) => {
                console.log(res.data)
                setUserRecipes(userRecipes.filter((item, i) => { return i !== index} ));
            })
    }
    const deleteUser = (e, id, index) => {
        e.preventDefault();
        axios.delete("http://localhost:5000/users/delete/"+ id)
            .then((res) => {
                console.log(res.data)
                setUsers(users.filter((item, i) => { return i !== index} ));
            })
    }

    const onSubmitUser = (e) => {
        e.preventDefault();
        const data = {
            username : username,
            password: password,
            password2 : password2,
            role : role
        }

        axios.post("http://localhost:5000/users/register",data)
            .then(res => {
                console.log(res.data.success)
                if (res.data.success) setSucces(res.data.success)

            })
        console.log(data)
    }
    return (
        <div>
            <h2>Tableau de bord</h2>
            <p>Bonjour {currentUser.username}</p>
            <p>{currentUser.role}</p>
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
            >
                <Tab eventKey="home" title="Utilisateurs">
                    <ul>
                        {users != null ? (
                            users.map((user, i) => {
                                return user.role  != "admin" ? (
                                    <li key={i}>
                                        {user.username}
                                        <Link to={"/recettes/modifier/"}> modifier </Link> / <button onClick={(e) => deleteUser(e,user._id,i) }>supprimer</button>
                                    </li>
                                ): (null)
                            })
                        ) : (null)}
                    </ul>
                </Tab>
                <Tab eventKey="profile" title="Creation compte">
                    <form action="POST" onSubmit={(e) => onSubmitUser(e)}>
                        <h4>Nom d'utilisateur</h4>
                        <input type="text" placeholder={"Nom d'utilisateur"} onChange={(e) => {e.preventDefault(); setUsername(e.target.value)}} />
                        <h4>Mot de passe</h4>
                        <input type="password" placeholder={"Mot de passe"} onChange={(e) => {e.preventDefault(); setPassword(e.target.value)}}/>
                        <h4>Confirmez le mot de passe</h4>
                        <input type="password" placeholder={"Mot de passe"} onChange={(e) => {e.preventDefault(); setPassword2(e.target.value)}}/>
                        <div>
                            <h4>Role</h4>
                            <select name="role"  onChange={(e) => {e.persist(); setRole(e.target.value)}}>
                                <option value="user">user</option>
                                <option value="admin">admin</option>
                            </select>
                        </div>

                        <div>
                            <input type="submit" value={"Créer"}/>
                        </div>

                    </form>

                </Tab>
                <Tab eventKey="contact" title="Contact" >

                </Tab>
            </Tabs>
            <h3>Vos recettes</h3>

            {userRecipes != null ? (
                userRecipes.map((recipe, i) => {
                    return <li key={i}>{recipe.title} <Link to={"/recettes/modifier/" + recipe._id}>modifier</Link> / <button onClick={(e) => deleteRecipe(e,recipe._id,i) }>supprimer</button></li>
                })
            ) : (null)}


        </div>
    )
}

export default Dashboard;