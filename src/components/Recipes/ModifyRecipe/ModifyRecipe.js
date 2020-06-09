import React, {useEffect, useState} from 'react';
import axios from 'axios';

const ModifyRecipe = (props) => {
    const [recipe, setRecipe] = useState(null)
    const recipeId = props.match.params.id

    useEffect(() => {
        axios.get("http://localhost:5000/recipes/" + recipeId)
            .then((res) => {
                console.log(res.data)
                setRecipe(res.data);
            })
    },[])
    return (
        <>
            <h1>Modification de la recette</h1>
            {recipe !== null ? (
                <div>
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
                </div>
            ) : (
                null
            )}

        </>
    );
}

export default ModifyRecipe;
