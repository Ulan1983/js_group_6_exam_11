const path = require('path');

const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid');

const config = require('../config');
const auth = require('../middleware/auth');

const Item = require('../models/Item');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, config.uploadPath);
	},
	filename: (req, file, cb) => {
		cb(null, nanoid() + path.extname(file.originalname));
	}
});

const upload = multer({storage});

const router = express.Router();

router.get('/', async (req, res) => {
	const items = await Item.find().populate('category');
	res.send(items);
});

router.get('/:id', async (req, res) => {
	try {
		const item = await Item.findById(req.params.id).populate({
			path: 'category',
			populate: {
				path: 'user'
			}
		});

		if (!item) {
			return res.status(404).send({message: 'Not found'});
		}

		return res.send(item);
	} catch (e) {
		res.status(404).send({message: 'Not found'});
	}
});

router.get('/:id', async (req, res) => {
	try {
		const items = await Item.find({category: req.params.id});

		if (!items) {
			return res.status(404).send({message: 'Not found'});
		}

		return res.send(items);
	} catch (e) {
		res.status(404).send({message: 'Not found'});
	}
});

router.post('/', upload.single('image'), auth, async (req, res) => {
	const itemData = req.body;

	if (req.file) {
		itemData.image = req.file.filename;
	}

	// if (itemData.title.length <= 2) {
	// 	return res.status(400).send({error: 'Please add not less then 3 symbols of title!'});
	// }
	//
	// if (itemData.description.length <= 4) {
	// 	return res.status(400).send({error: 'Please add not less then 5 symbols of description!'});
	// }
	//
	// if (itemData.price < 0) {
	// 	return res.status(400).send({error: 'Please add correct price!'});
	// }
	//
	// if (!itemData.image) {
	// 	return res.status(400).send({error: 'Please add image!'});
	// }

	itemData.user = req.user._id;

	const item = new Item(itemData);

	try {
		await item.save();

		return res.send(item);
	} catch (e) {
		return res.status(400).send(e);
	}
});

router.delete('/:id', auth, async (req, res) => {
	const user = req.user;

	try {
		const item = await Item.findOne({_id: req.params.id});

		if (!item) {
			return res.status(403).send({message: 'This user can not delete this item!'});
		}
		await Item.remove({_id: req.params.id});

		return res.send({message: 'Item has been deleted succesfully!'});
	} catch (e) {
		return res.status(500).send(e);
	}
});

module.exports = router;