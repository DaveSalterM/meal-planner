const { User } = require('../models');

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
};
