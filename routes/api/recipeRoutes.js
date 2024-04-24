const router = require('express').Router();

const {
	// getRecipes,
	getRecipeByName,
	createRecipe,
	deleteRecipe,
	updateRecipe,
} = require('../../controllers/recipeController');

// /api/recipes  (GETS ALL RECIPES)
// router.route('/').get(getRecipes);

// /api/recipes (GETS RECIPES BY NAME)
router.route('/').post(createRecipe).get(getRecipeByName);

router.route('/:recipeId').delete(deleteRecipe).put(updateRecipe);

module.exports = router;
