const connection = require('../config/connection');
const { User } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
	let userCheck = await connection.db
		.listCollections({ name: 'users' })
		.toArray();
	if (userCheck.length) {
		await connection.dropCollection('users');
	}

	let recipeCheck = await connection.db
		.listCollections({ name: 'recipes' })
		.toArray();
	if (userCheck.length) {
		await connection.dropCollection('recipes');
	}

	// User seed data
	await User.create({ username: 'User1', password: 'password1' }).then((data) =>
		console.log(data)
	);

	await User.create({ username: 'User2', password: 'password2' }).then((data) =>
		console.log(data)
	);

	await User.create({ username: 'User3', password: 'password3' }).then((data) =>
		console.log(data)
	);

	// Recipe seed data

	console.info('Seeding complete! 🌱');
	process.exit(0);
});
