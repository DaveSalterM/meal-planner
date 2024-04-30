const path = require('path');

module.exports = {
	async uploadImage(req, res) {
		try {
			// console.log(req.file);
			res.json({
				imageUrl: `http://localhost:3001/uploads/${req.file.filename}`,
			});
			// res.json(req.file);
		} catch (error) {
			console.log(error);
			res.json(error);
		}
	},
};
