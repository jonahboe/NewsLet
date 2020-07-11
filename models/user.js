const mongoose = require('mongoose');

const Post = require('../models/post');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    saved: {
        items: [
            {
                postId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Post',
                    required: true
                }
            }
        ]
    }
});

userSchema.methods.savePost = function(post) {
    const postIndex = this.saved.items.findIndex(item => {
        return item.postId.toString() === post._id.toString();
    });
    let newQuantity = 1;
    const updatedPostItems = [...this.saved.items];

    if (postIndex >= 0) {
        newQuantity = this.saved.items[postIndex].quantity + 1;
        updatedPostItems[postIndex].quantity = newQuantity;
    } else {
        updatedPostItems.push({
            postId: post._id,
            quantity: newQuantity
        });
    }
    const updatedPosts = {
        items: updatedPostItems
    };
    this.saved = updatedPosts;
    return this.save();
};

userSchema.methods.deleteSaved = function(postId) {
    const updatedSavedPosts = this.saved.items.filter(item => {
        return item.postId.toString() !== postId.toString();
    });
    this.saved.items = updatedSavedPosts;
    return this.save();
};

userSchema.methods.deleteSavedBySaveId = function(postId) {
    const updatedSavedPosts = this.saved.items.filter(item => {
        return item._id.toString() !== postId.toString();
    });
    this.saved.items = updatedSavedPosts;
    return this.save();
};

module.exports = mongoose.model('User', userSchema);
