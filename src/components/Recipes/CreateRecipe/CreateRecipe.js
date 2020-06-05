import React, {useState, useEffect, useContext} from 'react';
import {Container} from "react-bootstrap";
import { Button } from 'react-bootstrap';
import axios from 'axios';
import AuthContext from "../../../contexts/AuthContext";

const CreateRecipe = () => {
    const {currentUser} = useContext(AuthContext)

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [ingredients, setIngredients] = useState([{name: ""}])
    const [steps, setSteps] = useState([{step: ""}])
    const [userId, setUserId] = useState("")


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
        const data = {
            title : title,
            description : description,
            ingredients : ingredients,
            steps : steps,
            user_id : userId
        }

        console.log(data)
        axios.post("http://localhost:5000/recipes/add", data)
            .then(res => console.log(res.data));
    }


    return (
        <>
            <h1>Créer une recette</h1>
            <form action="POST" onSubmit={(e) => submit(e)}>
                <div>
                    <h2>Titre de la recette</h2>
                    <input type="text" onChange={(e) => { e.preventDefault(); setTitle(e.target.value)} }/>
                </div>
                <div>
                    <h2>Description</h2>
                    <textarea name="" id="" cols="50" rows="10" onChange={(e) => { e.preventDefault(); setDescription(e.target.value)}}/>
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
                                    {index + 1} <input  type="text" placeholder={"Étapes"}  id={index} onChange={(e) => {onChangeHandler(e, index,steps,setSteps,"step")}}/>
                                    {index != 0 ? (<input type="button" value={"x"} onClick={() => removeItem(index,steps,setSteps)}/>) : (null)}
                                </div>
                            )
                        })}
                        <div>
                            <input type="button" value={"Ajouter étape"} onClick={() => addItem(steps,setSteps,"step")}/>
                        </div>
                    </div>
                </div>
                <input type="submit" value={"Completer"}/>
            </form>
        </>
    );
}

export default CreateRecipe;
