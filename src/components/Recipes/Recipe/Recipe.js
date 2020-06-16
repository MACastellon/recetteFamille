import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar as Star} from "@fortawesome/free-solid-svg-icons";

const Recipe = (props) => {

    const recipeId =  props.match.params.id;
    const [recipe, setRecipe] = useState(null);
    const [favourite, setFavourite] = useState(false)


    useEffect( () => {
        if (recipe != null) return
        axios.get("http://localhost:5000/recipes/" + recipeId)
            .then((res)  => {
                console.log(res.data)
                setRecipe(res.data)
            })
    },[favourite])

    const addFavourites = () => {
        console.log("added")
        setFavourite(true)
    }
    const removeFavourites = () => {
        setFavourite(false)
        console.log("removed")
    }
    return (
        <>
            {recipe != null ? (
                <>
                    {favourite ? (
                        <Link  className={"favourite"} onClick={removeFavourites}><FontAwesomeIcon icon={Star}/></Link>
                    ) : (
                        <Link  className={"not-favourite"} onClick={addFavourites}><FontAwesomeIcon icon={Star}/></Link>
                    )}


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