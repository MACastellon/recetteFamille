import React, {useEffect, useState} from 'react';
import axios from 'axios';

const ModifyRecipe = (props) => {
    const [recipes, setRecipes] = useState(null)
    const recipeId = props.history.id;

    useEffect(() => {
        axios.get("http://localhost:5000/recipes/")
            .then((res) => {
                console.log(res.data)
                setRecipes(res.data);
            })
    },[])
    return (
        <>
            <h1>Modification de la recette</h1>

        </>
    );
}

export default ModifyRecipe;
