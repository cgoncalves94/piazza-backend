// Importing the required module
const Post = require('../models/Post');

// Defining an asynchronous function to check and update post expiration
async function checkAndUpdatePostExpiration(postId) {
    // Finding the post by its ID
    const post = await Post.findById(postId);

    // Checking if the post is already expired
    if (post.status === 'Expired') {
        return { expired: true, message: "This post has expired." };
    }

    // Getting the current time
    const currentTime = new Date();

    // Checking if the current time is greater than or equal to the post's expiration time
    // and the post is not already expired
    if (currentTime >= post.expirationTime && post.status !== 'Expired') {
        // Updating the post's status to 'Expired'
        post.status = 'Expired';
        await post.save();
        return { expired: true, message: "This post has expired." };
    }

    // Returning the result indicating that the post is not expired
    return { expired: false, post };
}

// Exporting the function directly
module.exports = checkAndUpdatePostExpiration;
