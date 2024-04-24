const router = require('express').Router();

const {
	getUsers,
	createUser,
	authenticateUser,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

router.route('/login').post(authenticateUser);

module.exports = router;
