// Importing the mongoose library
const mongoose = require('mongoose');

// Defining the post schema
const postSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Title of the post
    body: { type: String, required: true }, // Body/content of the post
    topic: { type: String, required: true}, // Topic/category of the post
    timestamp: { type: Date, default: Date.now }, // Timestamp of when the post was created
    expirationTime: { type: Date, required: true}, // Expiration time of the post
    status: { type: String, default: 'Live', enum: ['Live', 'Expired'] }, // Status of the post (Live or Expired)
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Owner of the post (reference to User model)
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Users who liked the post (references to User model)
    dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Users who disliked the post (references to User model)
    comments: [{ 
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // User who made the comment (reference to User model)
        comment: String, // Content of the comment
        timestamp: { type: Date, default: Date.now } // Timestamp of when the comment was made
    }]
});

// Exporting the Post model
module.exports = mongoose.model('Post', postSchema);
