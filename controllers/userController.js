const { User } = require('../models');
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

			res.json({ token });
		} catch (error) {
			console.log(error);
			res.status(500).json({ msg: error });
		}
	},
};
