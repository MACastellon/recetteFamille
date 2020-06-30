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
    ingredients: [],
    steps: [],
    category : {
        type : String,
        required : true
    },
    preparation : {
        type : Number,
        required : false
    },
    cooking : {
        type : Number,
        required : false
    },
    portion : {
        type : Number,
        required : false
    },
    date : {
        type : Date,
        required : true
    },

    user_id: { type:String , require: true}
});

const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;