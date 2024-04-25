const router = require('express').Router();

const {
	// getRecipes,
	getRecipeByName,
	createRecipe,
	deleteRecipe,
	updateRecipe,
} = require('../../controllers/recipeController');
const tokenAuth = require('../../middleware/tokenAuth');

// /api/recipes  (GETS ALL RECIPES)
// router.route('/').get(getRecipes);

// /api/recipes (GETS RECIPES BY NAME)
router.route('/').post(tokenAuth, createRecipe).get(getRecipeByName);

router
	.route('/:recipeId')
	.delete(tokenAuth, deleteRecipe)
	.put(tokenAuth, updateRecipe);

module.exports = router;
