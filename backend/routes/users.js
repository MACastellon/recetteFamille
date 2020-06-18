const router = require('express').Router();
const bcrypt = require('bcrypt');
const  jwt = require("jsonwebtoken");

let User = require('../models/user.model');
let Recipe = require('../models/recipe.model');
let Favourite = require('../models/favourite.model');


router.route("/").get((req,res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error : ' + err))
})
router.route("/:id").get((req,res) => {
    const userId = req.params.id;
    User.findOne({_id : userId})
        .then(user => {
            const data = {
                firstName: user.firstName,
                lastName : user.lastName
            }
            res.json(data);
        })
        .catch(err => res.status(400).json('Error : ' + err))
})

router.route("/:id/recipes").get((req,res) =>  {
    const userId = req.params.id
    if(!userId) res.json("Bad Request")
    Recipe.find({user_id : userId})
        .then(recipes =>  {
            res.json(recipes);
        })
        .catch(err => {
            res.json(err)
        })


})
router.route("/:user_id/favourites/:recipe_id").get((req,res) => {
    const userId = req.params.user_id;
    const recipeId = req.params.recipe_id;

    Favourite.findOne({ recipe_id : recipeId, user_id : userId})
        .then(favourite => {

            if (favourite !== null) {
                res.json(favourite);
            } else {
                res.json(false)
            }
        } )
} )
router.route("/:id/favourites").get((req,res) => {
    const userId = req.params.id;
    Favourite.find({user_id: userId})
        .then(favorites => {
            res.json(favorites);
        } )
} )
router.route("/favourites/add").post((req,res) => {
        const recipeId = req.body.recipeId;
        const userId = req.body.userId;
        Recipe.findOne({_id : recipeId})
            .then (recipe => {
                const newFavourite = new Favourite({
                    title: recipe.title,
                    recipe_id : recipe._id,
                    user_id : userId
                })
                newFavourite.save();
                res.json({message : "Recette ajouté à vos favoris", success: true})
            })
})

router.route("/favourites/remove").delete((req,res) => {
    const recipeId = req.body.recipeId;
    const userId = req.body.userId;
    Favourite.findOne({recipe_id : recipeId , user_id : userId})
        .then (favourite => {
            if (favourite  !== null ) {
                favourite.remove();
                res.json(false)
            } else {
                res.json(true);
            }
        })
})
router.route('/register').post(async (req,res) => {
    try {
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const username = req.body.username;
        const password =   req.body.password;
        const password2 = req.body.password2;
        const role = req.body.role;
        console.log(firstName)

        let errors = [];

        //Verification before the registration
        if (!username || !password || !password2 || !role || !firstName || !lastName) {
            res.json({message : "Tout les champs doivent être remplis", success: false})
        }

        if (password != password2) {
            res.json({message : "les mots de passes ne sont pas identiques", success: false});
        }


        //All information was complete hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Find user with the username send
        await User.findOne({username: username})
            .then((user) => {
                if (user) {
                    // if a username as been found
                   res.json({message : "le nom d'utilisateur " + username +" est déjà pris", success: false});
                } else {
                    // else create a new user with the request data
                    const newUser = new User({
                        firstName : firstName,
                        lastName: lastName,
                        username : username,
                        password : hashedPassword,
                        role : role
                    })

                    //Save the new user data in the database
                   newUser.save()
                        .then(() => {res.json({message : username +" à été créer avec succès", success: true})})
                }
            })
    } catch (e) {
        await res.status(500).res.json(e);
    }
})

router.route("/login").post(async (req,res) => {
    const username = req.body.username;
    const password =   req.body.password;
    let err = []
    if (username === "") err.push({message : "Le champs nom d'utilsateur est vide"})
    if (password === "") err.push({message : "Le champs de mot de passe est vide"})

    if (err.length != 0) res.json(err);
    else

    await User.findOne({username : username})
        .then( async (user) => {
            console.log(user.firstName);
            if (!user) res.json({message : "Ce compte n'est pas inscrit"})

            //Compare password
            const isMatch = await  bcrypt.compare(password, user.password)
            if (isMatch) {

                // Make object of user data without the password
                const userData = {
                    _id: user._id,
                    firstName : encodeURI(user.firstName),
                    lastName : encodeURI(user.lastName),
                    username : encodeURI(user.username),
                    role: user.role
                }

                //Create the jwt
                const accessToken = await jwt.sign(userData,process.env.ACCESS_TOKEN_SECRET);
                res.json({token : accessToken});
            } else {
                res.json({message :"Le mot de passe est incorrect"});
            }
        })
})
router.route("/delete/:id").delete(async (req,res) => {
    const userId = req.params.id;
    const userRole = req.body.role;
    let userRecipes = [];
    console.log(userId)
    if (userRole !== "admin") res.json({message: "Vous n'avez pas l'autorisation", success : false})

    User.findOne({_id : userId })
        .exec()
        .then(user => {
            user.remove();
            Recipe.find ({user_id: userId})
                .then(recipes => {
                    for (let i = 0; i < recipes.length; i++) {
                        Recipe.findOne({_id : recipes[i]._id})
                            .then (recipe => {
                                recipe.remove();
                            } )
                    }
                })
            res.json({message : "Utilisateur supprimer!" , success: true})
        })
        .catch(err => res.status(400).json('Error : ' + err))
})
router.route("/authenticateToken").post(async (req,res) => {
    const token = req.body.token;
    jwt.verify(token , process.env.ACCESS_TOKEN_SECRET, (err)  => {
        if (err) res.json({error : true})
        else res.json({error : false})
    })
})
module.exports = router;