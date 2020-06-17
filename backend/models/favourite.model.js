const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favouriteSchema = new Schema({
    title : {
        type: String,
        required: true
    },
    recipe_id: {
        type : String,
        required: true
    },
    user_id : {
        type: String,
        required: true
    }

});

const Favourite = mongoose.model('Favourite', favouriteSchema);

module.exports = Favourite;