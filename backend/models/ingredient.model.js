const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const IngredientSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    recipe_id : {
        type: String,
        required: false,
    }
});

const Ingredient = mongoose.model('Ingredient', IngredientSchema);

module.exports = Ingredient;