const router = require('express').Router();

const {
	getAllReviews,
	getOneReview,
	createReview,
	updateReview,
	deleteReview,
} = require('../../controllers/reviewController');
const tokenAuth = require('../../middleware/tokenAuth');

router
	.route('/')
	.get(getAllReviews)
	.post(tokenAuth, createReview)
	.put(tokenAuth, updateReview)
	.delete(tokenAuth, deleteReview);

router.route('/:reviewId').get(getOneReview);

module.exports = router;
