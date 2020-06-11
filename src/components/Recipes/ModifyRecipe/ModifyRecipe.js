import React, {useContext, useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import axios from 'axios';
import AuthContext from "../../../contexts/AuthContext";

const ModifyRecipe = (props) => {
    const {currentUser} = useContext(AuthContext);
    const [recipe, setRecipe] = useState(null)
    const recipeId = props.match.params.id

    useEffect(() => {
        axios.get("http://localhost:5000/recipes/" + recipeId)
            .then((res) => {
                console.log(res.data)
                if (res.data.user_id != currentUser._id) props.history.push("/")
                setRecipe(res.data);
            })
    },[recipeId])
    return (
        <>
            <h1>Modification de la recette</h1>
            {recipe !== null ? (
                <>
                    {recipe.user_id != currentUser._id ? props.history.push("/") : null }
                    <h2>{recipe.title}</h2>
                    <h3>Ingrédients</h3>
                    <ul>
                        {recipe.ingredients.map((ingredient, i) => {
                            return <li key={i}>{ingredient.name}</li>
                        })}
                    </ul>
                    <h3>Étapes</h3>
                    <ol>
                        {recipe.steps.map((step, i) => {
                            return <li key={i}>{step.step}</li>
                        })}
                    </ol>
                </>
            ) : (
                null
            )}
        </>
    );
}

export default ModifyRecipe;
