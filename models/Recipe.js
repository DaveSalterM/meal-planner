const { Schema, model } = require('mongoose');
// const Ingredients = require('./Ingredients');

const recipeSchema = new Schema({
	name: {
		type: String,
		// required: true,
		max_length: 100,
	},
	ingredients: { type: Array, default: [] },
	instructions: { type: Array },
	calories: {
		type: Number,
		default: 0,
	},
	user: { type: Schema.Types.ObjectId, ref: 'user' },
	reviews: [{ type: Schema.Types.ObjectId, ref: 'review' }],
	imgUrl: {
		type: String,
		default:
			'https://static5.depositphotos.com/1036149/436/i/450/depositphotos_4369784-stock-illustration-hamburger.jpg',
	},
});

const Recipe = model('recipe', recipeSchema);

module.exports = Recipe;
