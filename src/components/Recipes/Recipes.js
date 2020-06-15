import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
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
                    {recipes.map((recipe, i) => {
                        return (
                            <li key={i}>
                                <h3><Link to={"/recettes/" + recipe._id}>{recipe.title}</Link></h3>
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
