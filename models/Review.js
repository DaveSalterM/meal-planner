const { Schema, model } = require('mongoose');

const reviewSchema = new Schema({
	content: {
		type: String,
		required: true,
		max_length: 500,
	},
	user: { type: Schema.Types.ObjectId, ref: 'user' },
	recipe: { type: Schema.Types.ObjectId, ref: 'recipe' },
});

const Review = model('review', reviewSchema);

module.exports = Review;
