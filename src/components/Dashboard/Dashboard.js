import React, {useContext, useEffect, useState} from "react";
import AuthContext from "../../contexts/AuthContext";
import axios from "axios";
import {Link} from "react-router-dom";
import {Dropdown} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser, faCog} from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
    const {currentUser} = useContext(AuthContext);

    const [userRecipes, setUserRecipes] = useState(null)
    const [users, setUsers] = useState(null)
    const [key, setKey] = useState('home');
    const  [success, setSucces] = useState(false)


    useEffect( () => {

        axios.get("http://localhost:5000/users")
            .then((res) => {
                setUsers(res.data);
                console.log(res.data)
            })
    },[success])

    const deleteUser = (e, id, index) => {
        e.preventDefault();
        axios.delete("http://localhost:5000/users/delete/"+ id,{data: {
            role:currentUser.role
        }})
            .then((res) => {
                console.log(res.data)
                setUsers(users.filter((item, i) => { return i !== index} ));
            })
    }


    return (
        <div>
            <h2>Tableau de bord</h2>
            <p>Bonjour {decodeURI(currentUser.firstName)} {currentUser.lastName}</p>
            <Link to={"/utilisateur/inscrire"}>Créer un utilisateur</Link>
            <h3>Liste des utilisateurs </h3>
            <ul>
                {users != null ? (
                    users.map((user, i) => {
                        return (
                            <li key={i}>
                                <FontAwesomeIcon icon={faUser} /> {user.firstName} {user.lastName}
                                <Link to={{pathname : "/utilisateur/"+ user._id +"/recettes" , state : { username :user.firstName + " "+ user.lastName }}}>Voir recettes</Link>
                                {currentUser.role === "admin"? (
                                    currentUser.role ===  user.role  ? (
                                        null
                                    ) : (
                                        <Dropdown>
                                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                <FontAwesomeIcon icon={faCog} />
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item as={Link} to="#/action-1">Modifier</Dropdown.Item>
                                                <Dropdown.Item as={Link}  onClick={(e) => deleteUser(e,user._id,i) }>Supprimer</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    )
                                ) : (
                                    null
                                )}
                            </li>
                        )
                    })
                ) : (null)}
            </ul>


        </div>
    )
}

export default Dashboard;