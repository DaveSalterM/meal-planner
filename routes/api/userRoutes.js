const router = require('express').Router();

const {
	getUsers,
	getOneUser,
	createUser,
	authenticateUser,
	favoriteRecipe,
	unfavoriteRecipe,
} = require('../../controllers/userController');
const tokenAuth = require('../../middleware/tokenAuth');

// /api/users
router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getOneUser);

router
	.route('/:userId/favorites')
	.put(tokenAuth, favoriteRecipe)
	.delete(tokenAuth, unfavoriteRecipe);

router.route('/login').post(authenticateUser);

module.exports = router;
