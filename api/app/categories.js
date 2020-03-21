const express = require('express');

const Category = require('../models/Category');

const router = express.Router();

router.get('/', async (req, res) => {
	const categories = await Category.find();

	return res.send(categories);
});

router.post('/', async (req, res) => {
	const category = new Category(req.body);

	await category.save();

	return res.send(category);
});

module.exports = router;