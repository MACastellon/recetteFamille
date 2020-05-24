const router = require('express').Router();

let Recipe = require('../models/recipe.model');
let Ingredient = require('../models/ingredient.model');
let Step = require('../models/step.model');

router.route('/').get((req,res) => {
    Recipe.find()
        .then(recipes => res.json(recipes))
        .catch(err => res.status(400).json('Error : ' + err))

})

router.route('/add').post(async (req,res) => {

    // Gather all the information sent by the post method
    const title = req.body.title;
    const description = req.body.description;
    const image = req.body.image;
    const user_id = req.body.user_id;
    const ingredient = req.body.ingredient;
    const step = req.body.step;


    let recipe_id;

    //Creating the new recipe object
    const newRecipe = new Recipe({
        title,
        description,
        image,
        user_id
    });

    //Saving the new recipe in the database
    await  newRecipe.save()
        .then(() => {
            res.json('La recette à été ajouté !');
        })
        .catch(err => res.json(err));

    //save the recipe_id to add the ingredient and step
    recipe_id = newRecipe._id;

    //Add Ingredient in the database
    for (let i = 0; ingredient.length > i; i++) {
        const newIngredient = new Ingredient({
            quantity: ingredient[i].quantity,
            mesure : ingredient[i].mesure,
            name: ingredient[i].name,
            recipe_id : recipe_id
        })
        newIngredient.save();
    }

    //Add step in the database
    for (let i = 0; step.length > i; i++) {
        console.log(step[i].description);
        const newStep = new Step({
            description: step[i].description,
            recipe_id : recipe_id
        })
        newStep.save();
    }

})

module.exports = router;