const { connect, connection } = require('mongoose');
require('dotenv').config();

connect('mongodb://127.0.0.1:27017/MealMapper');

module.exports = connection;
