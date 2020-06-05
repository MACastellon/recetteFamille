import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Recipes = () => {
    const [recipes, setRecipes] = useState(null)
    useEffect(() => {
        axios.get("http://localhost:5000/recipes")
            .then((res) => {
                console.log(res.data)
                setRecipes(res.data);
            })
    },[])
    return (
        <>
            <h1>Recettes Route</h1>
            {recipes != null ? (
                <ul>
                    {recipes.map((recipe, index) => {
                        return (
                            <li key={index}>
                                <h3>{recipe.title}</h3>
                                <p> {recipe.description}</p>
                                <h4>Ingrédients</h4>
                                <ul>
                                    {recipe.ingredients.map ((ingredient,i)  => {
                                        return <li>{ingredient.name}</li>
                                    } )}
                                </ul>
                                <h4>Étapes</h4>
                                <ul>
                                    {recipe.steps.map ((step,i)  => {
                                        return <li>{i+1} {step.step}</li>
                                    } )}
                                </ul>
                            </li>
                        )
                    })}
                </ul>
            ) : (
                null
            )}
        </>
    );
}

export default Recipes;
