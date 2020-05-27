const router = require('express').Router();
const bcrypt = require('bcrypt');
const  jwt = require("jsonwebtoken");

let User = require('../models/user.model');

router.route("/").get((req,res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error : ' + err))
})


router.route('/register').post(async (req,res) => {
    try {

        const username = req.body.username;
        const password =   req.body.password;
        const password2 = req.body.password2;
        const role = req.body.role;

        let errors = [];

        //Verification before the registration
        if (!username || !password || !password2 || !role) {
            res.json({msg : 'Tout les champs doivent être remplient'})
        }

        if (password != password2) {
            res.json({msg : 'Les mots de passe doivent être identiques'});
        }


        //All information was complete hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Find user with the username send
        await User.findOne({username: username})
            .then((user) => {
                if (user) {
                    // if a username as been found
                   res.json("the username " + username +" is already taken");
                } else {
                    // else create a new user with the request data
                    const newUser = new User({
                        username : username,
                        password : hashedPassword,
                        role : role
                    })

                    //Save the new user data in the database
                   newUser.save()
                        .then(() => {res.json("User created with success")})
                }
            })
    } catch (e) {
        await res.status(500).res.json(e);
    }
})

router.route("/login").post(async (req,res) => {
    const username = req.body.username;
    const password =   req.body.password;

    await User.findOne({username : username})
        .then( async (user) => {

            if (!user) res.json("Ce compte n'est pas inscrit")

            //Compare password
            const isMatch = await  bcrypt.compare(password, user.password)
            if (isMatch) {

                // Make object of user data without the password
                const userData = {
                    _id: user._id,
                    username : user.username,
                    role: user.role
                }

                //Create the jwt
                const accessToken = await jwt.sign(userData,process.env.ACCESS_TOKEN_SECRET);
                res.json({token : accessToken});
            } else {
                res.json("Le mot de passe est incorrect");
            }
        })
})

router.route("/authenticateToken").post(async (req,res) => {
    const token = req.body.token;
    jwt.verify(token , process.env.ACCESS_TOKEN_SECRET, (err)  => {
        if (err) res.json({error : true})
        else res.json({error : false})
    })
})
module.exports = router;