const { Schema, model } = require('mongoose');

const userSchema = new Schema({
	username: {
		type: String,
		required: true,
		max_length: 50,
		unique: true,
		trim: true,
	},
	password: {
		type: String,
		required: true,
		max_length: 30,
	},
	// recipes: [{ type: Schema.Types.ObjectId, ref: 'recipe' }],
	meal_plan: [],
	shopping_list: [],
	// reviews: [{ type: Schema.Types.ObjectId, ref: 'reviews' }],
});

const User = model('users', userSchema);

module.exports = User;
