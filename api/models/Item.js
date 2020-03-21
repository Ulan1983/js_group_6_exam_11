const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	image: {
		type: String,
		required: true
	},
	category: {
		type: Schema.Types.ObjectId,
		ref: 'Category',
		required: true
	},
	user: {
		type: Schema.Types.ObjectID,
		ref: 'User',
		required: true
	}
});

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;