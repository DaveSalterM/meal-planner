const router = require('express').Router();
const userRoutes = require('./userRoutes');
const recipeRoutes = require('./recipeRoutes');
const reviewRoutes = require('./reviewRoutes');

router.use('/users', userRoutes);
router.use('/recipes', recipeRoutes);
router.use('/reviews', reviewRoutes);

module.exports = router;
