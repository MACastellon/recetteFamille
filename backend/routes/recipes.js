const router = require('express').Router();

let Recipe = require('../models/recipe.model');
let Ingredient = require('../models/ingredient.model');
let Step = require('../models/step.model');

router.route('/').get((req,res) => {
    Recipe.find()
        .populate("ingredients steps")
        .exec()
        .then(recipes => res.json(recipes))
        .catch(err => res.status(400).json('Error : ' + err))

})
router.route('/:id').get((req,res) => {
    const id = req.body._id
    Recipe.findOne({_id : id })
        .populate("ingredients steps")
        .exec()
        .then(recipes => res.json(recipes))
        .catch(err => res.status(400).json('Error : ' + err))

})

router.route('/add').post(async (req,res) => {

    // Gather all the information sent by the post method
    const title = req.body.title;
    const description = req.body.description;
    const image = req.body.image;
    const user_id = req.body.user_id;
    const ingredients = req.body.ingredients;
    const steps = req.body.steps;
    let ingredientsId = [];
    let stepsId = [];

    // errors arrays
    let err = [];
    let emptyIngredient = []
    let emptyStep = []

    //Verification before saving
    if (title === "") err.push({message : "Ajouter un titre"})
    if (description === "") err.push({message : "Ajouter une description"})

    for (let i = 0; i < ingredients.length; i ++) {
        if (ingredients[i].name === "") emptyIngredient.push({field : i})
    }

    if (emptyIngredient.length != 0) err.push({message : "vous avez " + emptyIngredient.length+ " champs d'ingrédients vide"})

    for (let i = 0; i < steps.length; i ++) {
        if (steps[i].step === "") emptyStep.push({field : i})
    }

    if (emptyStep.length != 0) err.push({message : "vous avez " + emptyStep.length + " champs d'étapes vide"})


    if (err.length > 0) res.json({err : err, success: false});

    //Verification done time to make and save the recipe

    for (let i = 0; ingredients.length > i; i++) {
        const newIngredient = new Ingredient({
            name: ingredients[i].name,
        })
        await newIngredient.save();
        ingredientsId.push(newIngredient._id)
    }

   for (let i = 0; steps.length > i; i++) {
        const newStep = new Step({
            step: steps[i].step,
        })
        await newStep.save();
        stepsId.push(newStep._id)
    }

    //Creating the new recipe object
    const newRecipe = new Recipe({
        title,
        description,
        image,
        ingredients : ingredientsId,
        steps: stepsId ,
        user_id
    });

    //Saving the new recipe in the database
    await  newRecipe.save()

   await res.json({message: "La recette à été ajouter", success: true})
})

router.route('/:id').put((req,res) => {
    const id = req.body._id
    Recipe.findOne({_id : id })
        .populate("ingredients steps")
        .exec()
        .then(recipes => res.json(recipes))
        .catch(err => res.status(400).json('Error : ' + err))

})
router.route('/:id/delete').delete((req,res) => {
    const id = req.params.id
    Recipe.findOne({_id : id })
        .exec()
        .then(recipes => {
            recipes.remove();
            res.json({message : "Recette supprimer!"})
        })
        .catch(err => res.status(400).json('Error : ' + err))

})

module.exports = router;