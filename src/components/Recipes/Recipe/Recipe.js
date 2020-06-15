import React, {useEffect, useState} from 'react';
import axios from "axios";


const Recipe = (props) => {

    const recipeId =  props.match.params.id;
    const [recipe, setRecipe] = useState(null);

    useEffect( () => {
        axios.get("http://localhost:5000/recipes/" + recipeId)
            .then((res)  => {
                console.log(res.data)
                setRecipe(res.data)
            })
    },[])
    return (
        <>
            {recipe != null ? (
                <>
                    <h2>{recipe.title}</h2>
                    <h3>Description</h3>
                    <p>{recipe.description}</p>
                    <h3>Ingrédients</h3>
                    <ul>
                        {recipe.ingredients.map((ingredient, index) => {
                            return <li key={index}> {ingredient.name}</li>
                        })}
                    </ul>
                    <h3>Étapes</h3>
                    <ol>
                        {recipe.steps.map((step, index) => {
                            return <li key={index}> {step.step}</li>
                        })}
                    </ol>
                </>
            ) : (null)}

        </>
    )
}
export default Recipe