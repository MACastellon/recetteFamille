import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import AuthContext from "../../../contexts/AuthContext";

const ModifyRecipe = (props) => {
    const {currentUser} = useContext(AuthContext);
    const recipeId = props.match.params.id;

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [ingredients, setIngredients] = useState([{name: ""}])
    const [steps, setSteps] = useState([{step: ""}])
    const [userId, setUserId] = useState("")

    const [err, setErr] = useState([])
    useEffect(() => {
        axios.get("http://localhost:5000/recipes/" + recipeId)
            .then((res) => {
                console.log(res.data)
                if (res.data.user_id != currentUser._id  && currentUser.role !== "admin") props.history.push("/")
                setTitle(res.data.title)
                setDescription(res.data.description);
                setIngredients(res.data.ingredients);
                setSteps(res.data.steps);
            })
    },[recipeId])


    useEffect(() =>{
        if (currentUser != null) setUserId(currentUser._id)
    } ,[ingredients, steps, currentUser])

    const addItem  = (list,setList,field) => {
        setList([...list, {[field] : ""}])
    }

    const onChangeHandler = (e, index,list,setList,field) => {
        e.persist();
        if(field === "name") setList([...list], list[index].name = e.target.value)
        else setList([...list], list[index].step = e.target.value)

    }
    const removeItem = (index,list,setList) => {
        setList(list.filter((item, i) => { return i !== index} ));
    };

    const submit = (e) => {
        e.preventDefault();
        setErr([])
        const data = {
            id: recipeId,
            title : title,
            description : description,
            ingredients : ingredients,
            steps : steps,
            user_id : userId
        }
        console.log(data);

       axios.patch("http://localhost:5000/recipes/update", data)
            .then(res => {
                console.log(res.data)
                if (res.data.err) setErr(res.data.err);
                if (res.data.success) props.history.push("/recettes/" + recipeId)
            });
    }
    return (
        <>
            <h2>Modification de recette</h2>
            <div>
                {err.length !== 0 ?(
                    <>
                        <h4>Vous avez les erreurs suivante</h4>
                        <ul>
                            {err.map((err,index) => {
                                return <li key={index}>{err.message}</li>
                            })}
                        </ul>
                    </>
                ) : (
                    null
                ) }

            </div>
            <form action="POST" onSubmit={(e) => submit(e)}>
                <div>
                    <h2>Titre de la recette</h2>
                    <input type="text"  value={title} onChange={(e) => { e.preventDefault(); setTitle(e.target.value)} }/>
                </div>
                <div>
                    <h2>Description</h2>
                    <textarea name="" id="" cols="50" rows="10" value={description} onChange={(e) => { e.preventDefault(); setDescription(e.target.value)}}/>
                </div>
                <div>
                    <div>
                        <h2>Ingédients</h2>
                        {ingredients.map( (ingredient, index) => {
                            return (
                                <div key={index} >
                                    <input  type="text" placeholder={"ingrédient"} value={ingredient.name}  id={index} onChange={(e) => {onChangeHandler(e, index,ingredients,setIngredients,"name")}}/>
                                    {index != 0 ? (<input type="button" value={"x"} onClick={() => removeItem(index,ingredients,setIngredients)}/>) : (null)}
                                </div>
                            )
                        })}
                        <div>
                            <input type="button" value={"Ajouter ingredient"} onClick={() => addItem(ingredients,setIngredients,"name")}/>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <h2>Étapes</h2>
                        {steps.map( (step, index) => {
                            return (
                                <div key={index} >
                                    {index + 1} <input  type="text" placeholder={"Étapes"} value={step.step}  id={index} onChange={(e) => {onChangeHandler(e, index,steps,setSteps,"step")}}/>
                                    {index != 0 ? (<input type="button" value={"x"} onClick={() => removeItem(index,steps,setSteps)}/>) : (null)}
                                </div>
                            )
                        })}
                        <div>
                            <input type="button" value={"Ajouter étape"} onClick={() => addItem(steps,setSteps,"step")}/>
                        </div>
                    </div>
                </div>
                <input type="submit" value={"Sauvegarder"}/>
                <input type="button" value={"Annuler"}/>
            </form>
        </>
    );
}

export default ModifyRecipe;
