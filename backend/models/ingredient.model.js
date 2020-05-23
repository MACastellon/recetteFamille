const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const IngredientSchema = new Schema({
    quantity : {
        type: Number,
        required: true,
    },
    mesure : {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    recipe_id : {
        type: String,
        required: true,
    }
});

const Ingredient = mongoose.model('Ingredient', IngredientSchema);

module.exports = Ingredient;