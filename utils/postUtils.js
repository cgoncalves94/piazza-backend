// Defining an asynchronous function to check post expiration
async function checkPostExpiration(post) {


    // Getting the current time
    const currentTime = new Date();

    // Checking if the current time is greater than or equal to the post's expiration time
    // and the post is not already expired
    if (currentTime >= post.expirationTime && post.status !== 'Expired') {
        // Indicate that the post should be updated to 'Expired'
        return { expired: true};
    }

    // Returning the result indicating that the post is not expired
    return { expired: false, post };
}

// Exporting the function directly
module.exports = checkPostExpiration;