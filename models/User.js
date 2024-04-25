const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
	username: {
		type: String,
		required: true,
		max_length: 50,
		unique: true,
		trim: true,
	},
	password: {
		type: String,
		required: true,
		max_length: 30,
	},
	recipes: [{ type: Schema.Types.ObjectId, ref: 'recipe' }],
	meal_plan: [],
	shopping_list: [],
	reviews: [{ type: Schema.Types.ObjectId, ref: 'reviews' }],
});

userSchema.pre('save', async function (next) {
	try {
		if (!this.isModified('password')) {
			return next();
		}

		this.password = await bcrypt.hash(this.password, 10);
	} catch (error) {
		next(error);
	}
});

const User = model('user', userSchema);

module.exports = User;
