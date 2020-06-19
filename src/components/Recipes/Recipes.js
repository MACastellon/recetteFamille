import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';

const Recipes = () => {
    const [recipes, setRecipes] = useState(null);
    const [loading, setLoading] = useState(true)

    const [search, setSearch] = useState("");
    useEffect(() => {

        axios.get("http://localhost:5000/recipes?q=" + search)
            .then((res) => {
                console.log(res.data)
                setRecipes(res.data);
                setLoading(false);
            })
    },[search])


    return (
        <>
            <h1>Recettes Route</h1>
            <input type="text" placeholder={"Recherche un recette"} onKeyDown={(e)  =>  {
                if(e.key === "Enter") {
                    setSearch(e.target.value)
                }
            }}/>
            {!loading ? (
                <>
                    {recipes.length >  0 ? (
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
                        <div>Aucune recette trouvé</div>
                    )}
                </>

            ) : (
                null
            )}
        </>
    );
}

export default Recipes;
