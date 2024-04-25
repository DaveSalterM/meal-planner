const { Schema, model } = require('mongoose');

const recipeSchema = new Schema({
	name: {
		type: String,
		required: true,
		max_length: 100,
	},
	ingredients: { type: Array, default: [] },
	calories: {
		type: Number,
		default: 0,
	},
	user: { type: Schema.Types.ObjectId, ref: 'user' },
	reviews: [{ type: Schema.Types.ObjectId, ref: 'review' }],
});

const Recipe = model('recipe', recipeSchema);

module.exports = Recipe;
