const { Recipe } = require('../models');

module.exports = {
	async getRecipes(req, res) {
		try {
			const recipes = await Recipe.find();
			res.status(200).json(recipes);
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}
	},
	async getRecipeByName(req, res) {
		try {
			const recipe = await Recipe.find({
				name: { $regex: req.body.name, $options: 'i' },
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
	async createRecipe(req, res) {
		try {
			const recipeData = await Recipe.create({
				name: req.body.name,
				ingredients: req.body.ingredients,
				calories: req.body.calories,
				user: req.body.userId,
			});
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
					calories: req.body.calories,
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

			if (!recipe) {
				return res.status(404).json({ message: 'This recipe does not exist!' });
			}
			res.json(recipe);
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}
	},
};
