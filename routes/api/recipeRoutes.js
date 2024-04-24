const router = require('express').Router();

const {
	getRecipes,
	createRecipe,
	deleteRecipe,
	updateRecipe,
} = require('../../controllers/recipeController');

// /api/recipes
router.route('/').get(getRecipes).post(createRecipe);

router.route('/:recipeId').delete(deleteRecipe).put(updateRecipe);

module.exports = router;
