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

	await User.create({ username: 'User1', password: 'password1' }).then((data) =>
		console.log(data)
	);

	await User.create({ username: 'User2', password: 'password2' }).then((data) =>
		console.log(data)
	);

	await User.create({ username: 'User3', password: 'password3' }).then((data) =>
		console.log(data)
	);

	console.info('Seeding complete! 🌱');
	process.exit(0);
});
