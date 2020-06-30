import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';

const Recipes = () => {
    const [recipes, setRecipes] = useState(null);
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("");
    useEffect(() => {

        axios.get("http://localhost:5000/recipes?q=" + search + "&f="+ filter)
            .then((res) => {
                console.log(res.data)
                setRecipes(res.data);
                setLoading(false);
            })
    },[search,filter])


    return (
        <>
            <h2>Recettes</h2>
            <input type="text" placeholder={"Recherche un recette"} onKeyDown={(e)  =>  {
                if(e.key === "Enter") {
                    setSearch(e.target.value)
                }
            }}/>
            <div className={"recipe-type"}>
                <Link className={filter === "" ? ("filter-active") : ("")} onClick={() => setFilter("")}>Tout</Link>
                <Link className={filter === "main" ? ("filter-active") : ("")} onClick={() => setFilter("main")}>Plat Principal</Link>
                <Link className={filter === "appetizers" ? ("filter-active") : ("")} onClick={() => setFilter("appetizers")}>Entrée</Link>
                <Link className={filter === "dessert" ? ("filter-active") : ("")} onClick={() => setFilter("dessert")}>Dessert</Link>
                <Link className={filter === "drink" ? ("filter-active") : ("")} onClick={() => setFilter("drink")}>Boisson</Link>
            </div>
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
