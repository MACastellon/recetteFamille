const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description : {
        type: String,
        required: true,
    },
    image : {
        type: String,
        required: false
    }
    ,
    madeBy : {
        type: String,
        required: false
    },
    ingredients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient',required : true }],
    steps: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Step',required : true }],

    user_id: { type:String , require: true}
});

const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;