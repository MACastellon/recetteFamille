const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StepSchema = new Schema({
    step: {
        type: String,
        required: true,
    },
    recipe_id : {
        type: String,
        required: true,
    }
});

const Step = mongoose.model('Step', StepSchema);

module.exports = Step;