import React, {useState} from 'react';
import {Container} from "react-bootstrap";
import { Button } from 'react-bootstrap';
import axios from 'axios';

const CreateRecipe = () => {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [ingredients, setIngredients] = useState([[{name: ""}]])
    const [steps, setSteps] = useState([[{description: ""}]])

    const addIngredient  = () => {
      setIngredients([...ingredients, [{name : ""}]])
        console.log(ingredients)
    }

    const onChangeHandler = (e, index) => {
        e.persist();
        let items = [...ingredients];
        let item = items[index];
        console.log(item);
        setIngredients([...ingredients], item[0].name = e.target.value)

        console.log(e.target.value)

    }
    const removeIngredient = (index) => {
        setIngredients(ingredients.filter((ingredient, i) => {return i !== index} ));
        /*return setIngredients(oldList => {
            return oldList.filter((ingredient, i) => {
                console.log(i)
                return i !== index;
            });
        });*/
    };


    const submit = (e) => {
        e.preventDefault();
        const data = {
            title : title,
            description : description,
            ingredients : ingredients,
            steps : steps
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
                                    <input  type="text" placeholder={"ingrédient"}  id={index} onChange={(e) => {onChangeHandler(e, index)}}/>
                                    {index != 0 ? (<input type="button" value={"x"} onClick={() => removeIngredient(index)}/>) : (null)}
                                </div>
                            )
                        })}
                        <div>
                            <input type="button" value={"Ajouter ingredient"} onClick={addIngredient}/>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <h2>Étapes</h2>
                        {steps.map( (step, index) => {
                            return (
                                <div key={index} >
                                    <input  type="text" placeholder={"Étapes"}  id={index} onChange={(e) => {onChangeHandler(e, index)}}/>
                                    {index != 0 ? (<input type="button" value={"x"} onClick={() => removeIngredient(index)}/>) : (null)}
                                </div>
                            )
                        })}
                        <div>
                            <input type="button" value={"Ajouter ingredient"} onClick={addIngredient}/>
                        </div>
                    </div>
                </div>

                <input type="submit" value={"Completer"}/>
            </form>
        </>
    );
}

export default CreateRecipe;
