import React, {useContext, useEffect, useState} from "react";
import AuthContext from "../../contexts/AuthContext";
import axios from "axios";
import {Link} from "react-router-dom";

const RecipesBook = ()  => {
    const {currentUser} = useContext(AuthContext);
    const [userRecipes, setUserRecipes] = useState(null)

    useEffect( () => {
        axios.get("http://localhost:5000/users/"+currentUser._id+"/recipes")
            .then((res) => {
                setUserRecipes(res.data);
                console.log(res.data)
            })
    },[userRecipes])
    const deleteRecipe = (e, id, index) => {
        e.preventDefault();
        axios.delete("http://localhost:5000/recipes/delete/"+ id)
            .then((res) => {
                console.log(res.data)
                setUserRecipes(userRecipes.filter((item, i) => { return i !== index} ));
            })
    }
    return (
        <>
            <h3>Mes recettes</h3>
            {userRecipes != null ? (
                userRecipes.map((recipe, i) => {
                    return <li key={i}>{recipe.title} <Link to={"/recettes/modifier/" + recipe._id}>modifier</Link> / <button onClick={(e) => deleteRecipe(e,recipe._id,i) }>supprimer</button></li>
                })
            ) : (null)}
        </>
    )
}

export default RecipesBook;