const { connect, connection } = require('mongoose');
require('dotenv').config();

const connectionString =
	process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/MealMapper';
// const connectionString = 'mongodb://127.0.0.1:27017/MealMapper';

connect(connectionString);
// connect();

module.exports = connection;
