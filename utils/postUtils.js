/**
 * Checks and updates the expiration status of a post.
 * @param {string} postId - The ID of the post to check.
 * @returns {Promise<{ expired: boolean, message?: string, post?: object }>} - An object indicating whether the post has expired, along with an optional message and the updated post object.
 */
const Post = require('../models/Post');

async function checkAndUpdatePostExpiration(postId) {
    const post = await Post.findById(postId);

    // Check if the post is already expired
    if (post.status === 'Expired') {
        return { expired: true, message: "This post has expired." };
    }

    const currentTime = new Date();
    if (currentTime >= post.expirationTime && post.status !== 'Expired') {
        post.status = 'Expired';
        await post.save();
        return { expired: true, message: "This post has expired." };
    }

    return { expired: false, post };
}
module.exports = checkAndUpdatePostExpiration; // Exporting the function directly
