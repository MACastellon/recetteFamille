import React, {useContext, useEffect, useState} from "react";
import AuthContext from "../../contexts/AuthContext";
import axios from "axios";
import {Link} from "react-router-dom";

const Dashboard = () => {
    const {currentUser} = useContext(AuthContext);

    const [userRecipes, setUserRecipes] = useState(null)

    useEffect( () => {
        const data = {
            id : currentUser._id
        }
        axios.get("http://localhost:5000/users/"+currentUser._id+"/recipes")
            .then((res) => {
                setUserRecipes(res.data);
                console.log(res.data)
            })
    },[])


    return (
        <div>
            <h2>Tableau de bord</h2>
            <p>Bonjour {currentUser.username}</p>
            <h3>Vos recettes</h3>
            {userRecipes != null ? (
                userRecipes.map((recipe, i) => {
                        return <li key={i}>{recipe.title} <Link to={"/recettes/modifier/" + recipe._id}>modifier</Link></li>
                    })
            ) : (null)}

        </div>
    )
}

export default Dashboard;