const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const Comment = require('./comment'); //import the comment model
// const User = require('./user'); //import the user model

const postSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Post", postSchema);