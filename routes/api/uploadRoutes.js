const router = require('express').Router();
const { uploadImage } = require('../../controllers/uploadController');
const multer = require('multer');
const path = require('path');

// Multer storage configuration
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public/uploads');
	},
	filename: function (req, file, cb) {
		cb(
			null,
			file.fieldname + '_' + Date.now() + path.extname(file.originalname)
		);
	},
});

const upload = multer({ storage: storage });

router.post('/', upload.single('image'), uploadImage);

module.exports = router;
