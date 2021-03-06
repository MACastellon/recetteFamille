const router = require('express').Router();
const path = require("path");
const {format} = require('util')
const {Storage} = require('@google-cloud/storage');
const Multer = require('multer');

let Recipe = require('../models/recipe.model');
let User = require('../models/user.model');
let Favourite = require('../models/favourite.model');

const multer = Multer({
    storage : Multer.memoryStorage(),
    limits : {
        fileSize : 5 * 1024 * 1024
    }
})
const gc = new Storage({
    keyFilename : path.join(__dirname, '../la-familia-281914-e99f1a6fd73e.json'),
    projectId : 'la-familia-281914'
});

const bucket = gc.bucket('la-familia');


router.route('/').get((req,res) => {
    const query = req.query.q;
    const filter = req.query.f;
    if (query != "") {
        if (filter != "") {
            Recipe.find({category : filter,title: {$regex: query.toUpperCase(), $options : "i"}})
                .exec()
                .then(recipes => res.json(recipes))
                .catch(err => res.status(400).json('Error : ' + err))
        } else {
            Recipe.find({title: {$regex: query.toUpperCase(), $options : "i"}})
                .exec()
                .then(recipes => res.json(recipes))
                .catch(err => res.status(400).json('Error : ' + err))
        }
    } else {
        if (filter != "") {
            Recipe.find({category : filter})
                .exec()
                .then(recipes => res.json(recipes))
                .catch(err => res.status(400).json('Error : ' + err))
        } else {
            Recipe.find()
                .exec()
                .then(recipes => res.json(recipes))
                .catch(err => res.status(400).json('Error : ' + err))
        }
    }
})
router.route('/:id').get((req,res) => {
    const id = req.params.id
    Recipe.findOne({_id : id })
        .exec()
        .then(recipe => res.json(recipe))
        .catch(err => res.status(400).json('Error : ' + err))

})

router.route('/add').post( multer.single("image") , async (req,res) => {

    // Gather all the information sent by the post method
    const title = req.body.title;
    const description = req.body.description;
    let image;
    const user_id = req.body.user_id;
    const ingredients = JSON.parse(req.body.ingredients);
    const steps = JSON.parse(req.body.steps);
    const category = req.body.category;
    console.log(title , category)
    const blob = bucket.file(req.file.originalname);
    const blobStream = blob.createWriteStream();

    blobStream.on('error', (err) => {
       err.push({message : "L'image n'as pas peut être uploader"})
    });

    blobStream.end(req.file.buffer);

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

    //Creating the new recipe object
    const newRecipe = new Recipe({
        title: title.toUpperCase(),
        description,
        image :  format(
            `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        ),
        ingredients : ingredients,
        steps: steps,
        category : category,
        date : Date.now(),
        user_id
    });

    //Saving the new recipe in the database
    await  newRecipe.save()

    await  User.updateOne({_id : user_id}, {$push :{'recipes' : newRecipe._id}})

    await res.json({message: "La recette à été ajouter", success: true})
})

router.route('/update').patch((req, res) => {
    const recipeId = req.body.id
    const title = req.body.title;
    const description = req.body.description;
    const image = req.body.image;
    const user_id = req.body.user_id;
    const ingredients = req.body.ingredients;
    const steps = req.body.steps;
    const category = req.body.category;


    // errors arrays
    let err = [];
    let emptyIngredient = []
    let emptyStep = []

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



    console.log(title, description,user_id,ingredients,steps)


   Recipe.updateOne({_id : recipeId}, {$set : {
            title : title.toUpperCase(),
            description : description,
            ingredients : ingredients,
            steps : steps,
            category : category
        },
    })
       .then(() => {
           res.json({message : "La recette à été modifier avec succès", success: true})
       })

})
 router.route('/delete/:id').delete((req,res) => {
    const id = req.params.id;

    Recipe.findOne({_id : id })
        .exec()
        .then(recipe => {
            recipe.remove();
            Favourite.find({recipe_id : id})
                .then( favourites => {
                    if (favourites.length > 0) {
                        for (let i = 0; i < favourites.length; i++) {
                             favourites[i].remove();
                        }
                         res.json({message : "Recette supprimer!"})
                    } else {
                         res.json({message : "Recette supprimer!"})
                    }
                })
        })
        .catch(err => res.status(400).json('Error : ' + err))
})

module.exports = router;