const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

router.use(require('method-override')('_method'));

//New post from route
router.get('/new', (req, res) => {
    res.render('new')
});