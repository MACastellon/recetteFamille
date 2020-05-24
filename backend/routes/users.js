const router = require('express').Router();
const bcrypt = require('bcrypt');



let User = require('../models/user.model');


router.route('/register').post(async (req,res) => {
    try {
        const username = req.body.username;
        const password =   req.body.password;
        const password2 = req.body.password2;
        const role = req.body.role;
        let errors = [];

        const hashedPassword = await bcrypt.hash(password, 10);

        if (password != password2) {
             res.json("Your passwords needs to match")
        }


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

module.exports = router;