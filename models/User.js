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

	meal_plan: {
		type: [
			{
				day: String, // Day of the week
				recipes: [{ type: Schema.Types.ObjectId, ref: 'recipe' }], // Array of recipe IDs
			},
		],
		default: [
			{ day: 'Sunday', recipes: [] },
			{ day: 'Monday', recipes: [] },
			{ day: 'Tuesday', recipes: [] },
			{ day: 'Wednesday', recipes: [] },
			{ day: 'Thursday', recipes: [] },
			{ day: 'Friday', recipes: [] },
			{ day: 'Saturday', recipes: [] },
		],
	},

	shopping_list: [{ type: Schema.Types.ObjectId, ref: 'recipe' }],
	reviews: [{ type: Schema.Types.ObjectId, ref: 'review' }],
	favorites: [{ type: Schema.Types.ObjectId, ref: 'recipe' }],
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
