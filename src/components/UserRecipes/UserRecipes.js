import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";


const UserRecipes = (props) => {
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
    return (
        <>
            { userRecipes  && user!= null ? (
                <>
                    <h3>Listes de recettes de {user.firstName} {user.lastName}</h3>
                    <ul>
                        {userRecipes.map((recipe, index) => {
                            return <li key={index}>
                                <Link to={"/recettes/" + recipe._id}>{recipe.title}</Link>
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