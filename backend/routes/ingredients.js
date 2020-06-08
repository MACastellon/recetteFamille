const router = require('express').Router();

let Recipe = require('../models/recipe.model');
let Ingredient = require('../models/ingredient.model');

router.route('/add').post(async (req,res) => {
    const name = req.body.name;
    const recipeId = req.body.recipeId;
    let newIngredientId;


    if (name === "") res.json({message : "Le champ ne peut pas être vide"})

    //Create a new ingredient with the name value
    const newIngredient = new Ingredient({
        name: name,
    })

    //save the new ingredient
    await newIngredient.save();
    newIngredientId = newIngredient._id


    //add the id to the ingredient array in the recipe
    Recipe.updateOne({_id : recipeId}, {$push : {"ingredients" : newIngredientId}})
        .then(res => {res.json(name +  " will be added")})
    
})

router.route("/modify").patch((req,res) => {
    const id = req.body.id
    const name = req.body.name;

    if (name === "") res.json({message : "Le champ ne peut-être vide"})

    Ingredient.updateOne({_id: id}, {$set: {name: name}})
        .catch(err => console.log(err))
    res.json("L'ingrédient à été modifier avec succès" );
})

router.route("/delete").delete((req,res) => {
    const ingredientId = req.body.id

    Ingredient.deleteOne({_id: ingredientId})
        .catch(err => console.log(err))
    Recipe.updateOne({"ingredients" : ingredientId}, {$pull : {"ingredients" : ingredientId}})
        .catch(err => console.log(err))
    res.json("L'ingrédient à été supprimer avec succès" );
})

module.exports = router