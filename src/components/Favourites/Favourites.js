import React, {useContext, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';
import AuthContext from "../../contexts/AuthContext";

const Favourites = () => {
    const {currentUser} = useContext(AuthContext);
    const [favorites, setFavorites] = useState(null)

    useEffect(() => {
        axios.get("http://localhost:5000/users/" + currentUser._id + "/favourites")
            .then(res => {
                setFavorites(res.data);
            })
    },[])
    return (
        <>
            <h2>Mes recettes favorites</h2>
            {favorites !== null ? (
                <ul>
                    {favorites.map((favorite, index) => {
                        return <li key={index}><Link to={"/recettes/" + favorite.recipe_id}>{favorite.title}</Link></li>
                    }) }
                </ul>
            ) : (
                null
                )}
        </>
    )
}

export default Favourites;