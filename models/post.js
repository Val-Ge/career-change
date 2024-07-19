const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const Comment = require('./comment'); //import the comment model
// const User = require('./user'); //import the user model

const postSchema = new Schema ({
    title: String,
    content: String,
    image: String
    // comments: [{ type: Schema.Types.ObjectId, ref: 'Comment', default: [] }] //use objectId type referencing Comment model
});

module.exports = mongoose.model("Post", postSchema);