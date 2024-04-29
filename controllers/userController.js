const { User, Recipe } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
	async getUsers(req, res) {
		try {
			const users = await User.find();
			res.status(200).json(users);
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}
	},

	async getOneUser(req, res) {
		try {
			// the userId params must be a 24 character hex string, 12 byte Uint8Array, or an integer
			const user = await User.findOne({ _id: req.params.userId }).populate(
				'recipes'
			);
			if (!user) {
				return res.status(404).json({ msg: 'no such User' });
			}

			// const userRecipes = await Recipe.find({ user: user._id });
			// res.json({ user, userRecipes });
			res.json(user);
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}
	},

	// Create a new user
	async createUser(req, res) {
		try {
			const userData = await User.create({
				username: req.body.username,
				password: req.body.password,
			});
			res.status(201).json(userData);
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}
	},

	// Login route
	async authenticateUser(req, res) {
		try {
			const user = await User.findOne({ username: req.body.username });
			if (!user) {
				return res.status(401).json({ message: 'No user with that ID' });
			} else if (!bcrypt.compareSync(req.body.password, user.password)) {
				return res.status(401).json({ msg: 'invalid credentials' });
			}

			const token = jwt.sign(
				{
					id: user.id,
					username: user.username,
				},
				process.env.TOKEN_SECRET,
				{
					expiresIn: '2h',
				}
			);
			console.log("User: ", user);
			res.json({ token, user});
		} catch (error) {
			console.log(error);
			res.status(500).json({ msg: 'error' });
		}
	},

	async favoriteRecipe(req, res) {
		try {
			const data = await User.findOneAndUpdate(
				{ _id: req.user.id },
				{ $addToSet: { favorites: req.body.recipeId } },
				{ new: true }
			);

			res.json(data);
		} catch (error) {
			console.log(error);
			res.status(500).json({ msg: error });
		}
	},
	async unfavoriteRecipe(req, res) {
		try {
			const data = await User.findOneAndUpdate(
				{ _id: req.user.id },
				{ $pull: { favorites: req.body.recipeId } },
				{ new: true }
			);
			res.json(data);
		} catch (error) {
			console.log(error);
			res.status(500).json({ msg: error });
		}
	},
};
