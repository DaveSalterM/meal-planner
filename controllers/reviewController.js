const { Recipe, User, Review } = require('../models');

module.exports = {
	async getAllReviews(req, res) {
		try {
			const reviews = await Review.find();
			res.status(200).json(reviews);
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}
	},
	async getOneReview(req, res) {
		try {
			const review = await Review.findOne({ _id: req.params.reviewId });
			res.json(review);
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}
	},
	async createReview(req, res) {
		try {
			const review = await Review.create({
				content: req.body.content,
				user: req.user.id,
				recipe: req.body.recipeId,
			});

			const userData = await User.findOneAndUpdate(
				{ _id: req.user.id },
				{ $addToSet: { reviews: review._id } },
				{ new: true }
			);

			const recipeData = await Recipe.findOneAndUpdate(
				{
					_id: req.body.recipeId,
				},
				{ $addToSet: { reviews: review._id } },
				{ new: true }
			);

			res.json(review);
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}
	},
	async updateReview(req, res) {
		try {
			const review = await Review.findOneAndUpdate(
				{ _id: req.body.reviewId },
				// {_id: req.params.reviewId}
				{ content: req.body.content }
			);
			res.json(review);
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}
	},

	async deleteReview(req, res) {
		try {
			const review = await Review.findOneAndDelete(
				{ _id: req.body.reviewId }
				// {_id: req.params.reviewId}
			);

			const userData = await User.findOneAndUpdate(
				{ _id: review.user },
				{ $pull: { reviews: review._id } },
				{ new: true }
			);

			const recipeData = await Recipe.findOneAndUpdate(
				{ _id: review.recipe },
				{ $pull: { reviews: review._id } },
				{ new: true }
			);

			res.json(review);
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}
	},
};
