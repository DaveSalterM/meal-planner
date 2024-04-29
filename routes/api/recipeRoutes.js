const router = require('express').Router();

const {
	// getRecipes,
	getRecipeByName,
	getOneRecipe,
	createRecipe,
	deleteRecipe,
	updateRecipe,
} = require('../../controllers/recipeController');
const tokenAuth = require('../../middleware/tokenAuth');

// /api/recipes  (GETS ALL RECIPES)
// router.route('/').get(getRecipes);

// /api/recipes (GETS RECIPES BY NAME)
router.route('/').post(createRecipe).get(getRecipeByName);

router
	.route('/:recipeId')
	.get(getOneRecipe)
	.delete(tokenAuth, deleteRecipe)
	.put(tokenAuth, updateRecipe);

module.exports = router;
