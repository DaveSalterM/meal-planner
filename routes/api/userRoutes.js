const router = require('express').Router();

const {
	getUsers,
	getOneUser,
	createUser,
	authenticateUser,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getOneUser);

router.route('/login').post(authenticateUser);

module.exports = router;
