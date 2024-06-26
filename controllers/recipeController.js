const { Recipe, User } = require('../models');
// const jwt = require('jsonwebtoken');
// const tokenAuth = require('../middleware/tokenAuth');

async function sortRecipesByFav() {
	try {
		const sortedRecipes = await Recipe.aggregate([
			{
				$match: { userFavorites: { $exists: true, $ne: [] } },
			},
			{
				$addFields: {
					userFavCount: { $size: '$userFavorites' },
				},
			},
			{
				$sort: { userFavCount: -1 },
			},
			{
				$limit: 8,
			},
		]);
		return sortedRecipes;
	} catch (error) {
		throw error;
	}
}

async function populateUser(recipes) {
	try {
		await Recipe.populate(recipes, { path: 'user', select: 'username' });
		return recipes;
	} catch (error) {
		throw error;
	}
}

module.exports = {
	async getRecipes(req, res) {
		try {
			// const recipes = await Recipe.find();
			const recipes = await sortRecipesByFav();
			const populateRecipes = await populateUser(recipes);
			res.status(200).json(populateRecipes);
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}
	},
	// Change this so that the word is found in the parameters instead of the body?
	async getRecipeByName(req, res) {
		try {
			const recipe = await Recipe.find({
				name: { $regex: req.params.recipe, $options: 'i' },
			}).populate({
				path: 'user',
				select: 'username',
			});
			if (!recipe) {
				return res.status(404).json({ msg: 'no such recipe' });
			}
			res.json(recipe);
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}
	},
	async getOneRecipe(req, res) {
		try {
			const recipe = await Recipe.findOne({
				_id: req.params.recipeId,
			}).populate([
				{
					path: 'user',
					select: 'username',
				},
				{
					path: 'reviews',
					options: { sort: { createdAt: -1 } },
					select: ['_id', 'content', 'user'],
					populate: { path: 'user', select: ['_id', 'username'] },
				},
			]);
			// console.log(recipe);
			res.json(recipe);
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}
	},
	async createRecipe(req, res) {
		try {
			const recipeData = await Recipe.create({
				name: req.body.name,
				ingredients: req.body.ingredients,
				instructions: req.body.instructions,
				calories: req.body.calories,
				servings: req.body.servings,
				imgUrl: req.body.imgUrl,
				user: req.user.id,
			});

			const userData = await User.findOneAndUpdate(
				{ _id: req.user.id },
				{ $addToSet: { recipes: recipeData._id } },
				{ new: true }
			);

			if (!userData) {
				return res.status(404).json({
					message: 'Recipe created, but found no user with that ID',
				});
			}

			res.status(201).json(recipeData);
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}
	},
	async updateRecipe(req, res) {
		try {
			const recipe = await Recipe.findOneAndUpdate(
				{ _id: req.params.recipeId },
				{
					name: req.body.name,
					ingredients: req.body.ingredients,
					instructions: req.body.instructions,
					calories: req.body.calories,
					servings: req.body.servings,
					imgUrl: req.body.imgUrl,
				},
				{ runValidators: true, new: true }
			);
			if (!recipe) {
				return res.status(404).json({ message: 'No recipe with this id!' });
			}
			res.json(recipe);
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}
	},
	async deleteRecipe(req, res) {
		try {
			const recipe = await Recipe.findOneAndDelete({
				_id: req.params.recipeId,
			});

			const userData = await User.findOneAndUpdate(
				{
					_id: req.user.id,
				},
				{ $pull: { recipes: recipe._id } },
				{ new: true }
			);

			if (!recipe) {
				return res.status(404).json({ message: 'This recipe does not exist!' });
			}

			if (!userData) {
				return res.status(404).json({
					message: 'Recipe delete, but found no user with that ID',
				});
			}
			res.json(recipe);
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}
	},
	// async favoriteRecipe(req,res){
	// 	try {
	// 		const data = await Recipe.findOne
	// 	} catch (error) {

	// 	}
	// }
};
