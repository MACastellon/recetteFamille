import React, {useContext, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart as Heart} from "@fortawesome/free-solid-svg-icons";
import AuthContext from "../../../contexts/AuthContext";

const Recipe = (props) => {

    const recipeId =  props.match.params.id;
    const [recipe, setRecipe] = useState(null);
    const [favourite, setFavourite] = useState(false)
    const {currentUser} = useContext(AuthContext)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        if (currentUser === null) return
        axios.get("http://localhost:5000/users/" + currentUser._id + "/favourites/" + recipeId )
            .then((res)  => {
                setFavourite(res.data)
            })
    },[])

    useEffect( () => {
        if (recipe != null) return
        axios.get("http://localhost:5000/recipes/" + recipeId)
            .then((res)  => {
                setRecipe(res.data)
            })
        setLoading(false)
    },[favourite])

    const addFavourites = () => {
        console.log("added")

        const data = {
            recipeId : recipeId,
            userId : currentUser._id
        }
        axios.post("http://localhost:5000/users/favourites/add", data)
            .then((res) => {
                setFavourite(res.data)
            })
    }
    const removeFavourites = () => {
        const data = {
            recipeId : recipeId,
            userId : currentUser._id
        }
        axios.delete("http://localhost:5000/users/favourites/remove", {data})
            .then((res) => {
                setFavourite(res.data)
            })
        console.log("removed")
    }
    return (
        <>
            {recipe != null  && !loading ? (
                <>
                    {favourite ? (
                        <Link to={"#"} className={"favourite"} onClick={removeFavourites}><FontAwesomeIcon icon={Heart}/></Link>
                    ) : (
                        currentUser != null ? (
                            <Link className={"not-favourite"}  onClick={addFavourites}><FontAwesomeIcon icon={Heart}/></Link>
                        ) : (
                            <Link to={"/utilisateur/connexion"} className={"not-favourite"}><FontAwesomeIcon icon={Heart}/></Link>
                        )

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