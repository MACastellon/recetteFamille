import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {Dropdown} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCog} from "@fortawesome/free-solid-svg-icons";
import AuthContext from "../../contexts/AuthContext";

const UserRecipes = (props) => {
    const {currentUser} = useContext(AuthContext);
    const [userRecipes , setUserRecipes] =useState([]);
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);
    useEffect( () => {

        axios.get("http://localhost:5000/users/" + props.match.params.id )
            .then((res) => {
                setUser(res.data)
            })
        axios.get("http://localhost:5000/users/" + props.match.params.id + "/recipes")
            .then((res) => {
                setUserRecipes(res.data);
                console.log(res.data)
            })
    },[])

    const deleteRecipe = (e, id, index) => {
        e.preventDefault();
        axios.delete("http://localhost:5000/recipes/delete/" + id,{data: {
                role:currentUser.role
            }})
            .then((res) => {
                console.log(res.data)
                setUserRecipes(userRecipes.filter((item, i) => { return i !== index} ));
            })
    }

    return (
        <>
            { userRecipes  && user!= null ? (
                <>
                    <h3>Listes de recettes de {user.firstName} {user.lastName}</h3>
                    <ul>
                        {userRecipes.map((recipe, i) => {
                            return <li key={i}>
                                <Link to={"/recettes/" + recipe._id}>{recipe.title}</Link>
                                {currentUser.role === "admin"? (
                                    currentUser.role ===  user.role  ? (
                                        null
                                    ) : (
                                        <Dropdown>
                                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                <FontAwesomeIcon icon={faCog} />
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item as={Link} to={"/recettes/modifier/" + recipe._id}>Modifier</Dropdown.Item>
                                                <Dropdown.Item as={Link}  onClick={(e) => deleteRecipe(e,recipe._id,i) }>Supprimer</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    )
                                ) : (
                                    null
                                )}
                            </li>
                        })}
                    </ul>
                </>
            ) : (
                null
            )}
        </>
    )
}

export  default UserRecipes;