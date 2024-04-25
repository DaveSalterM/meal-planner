const express = require('express');
const router = require('express').Router();
const apiRoutes = require('./api');
const jwt = require('jsonwebtoken');

router.use('/api', apiRoutes);

// Test a protected route to check if the user is logged in
router.get('/protected', (req, res) => {
	console.log(req.headers);
	const token = req.headers?.authorization?.split(' ')[1];
	// const token = req.headers?.authorization?.split(' ')[0];
	console.log('==============================');
	console.log(token);

	try {
		const tokenDecoded = jwt.verify(token, process.env.TOKEN_SECRET);
		res.json({ msg: 'welcome to the club!', tokenDecoded });
	} catch (error) {
		res.status(403).json({ msg: 'invalid token' });
	}
});

router.use((req, res) => {
	return res.send('Wrong route!');
});

module.exports = router;
