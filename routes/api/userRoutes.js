const router = require('express').Router();

const {
	getUsers,
	getOneUser,
	getUserFavorites,
	createUser,
	authenticateUser,
	favoriteRecipe,
	unfavoriteRecipe,
	addToMealPlan,
	addToShoppingList,
	removeFromMealPlan,
	removeFromShoppingList,
} = require('../../controllers/userController');
const tokenAuth = require('../../middleware/tokenAuth');

// /api/users/
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getOneUser);

router
	.route('/:userId/favorites')
	.get(getUserFavorites)
	.put(tokenAuth, favoriteRecipe)
	.delete(tokenAuth, unfavoriteRecipe);

router.route('/login').post(authenticateUser);

router
	.route('/:userId/mealplan')
	.post(tokenAuth, addToMealPlan)
	.delete(tokenAuth, removeFromMealPlan);

router
	.route('/:userId/shoppinglist')
	.post(tokenAuth, addToShoppingList)
	.delete(tokenAuth, removeFromShoppingList);

module.exports = router;
