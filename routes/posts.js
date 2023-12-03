// Importing express module
const express = require('express');

// Creating a router object
const router = express.Router();

// Importing Post model
const Post = require('../models/Post');

// Importing verify token function
const verifyToken = require('../verifyToken');

// Importing the checkAndUpdatePostExpiration function from the postUtils module
const checkAndUpdatePostExpiration = require('../utils/postUtils');



// POST /api/posts - Create a new post
// This route handles the POST request to create a new post. It expects the request body to contain
// the title, body, and topic of the post. The owner of the post is set to the authenticated user.
router.post('/', verifyToken, async (req, res) => {
    try {
        const newPost = new Post({
            title: req.body.title, // Set the title of the new post to the value of req.body.title
            body: req.body.body, // Set the body of the new post to the value of req.body.body
            topic: req.body.topic, // Set the topic of the new post to the value of req.body.topic
            owner: req.user._id // Set the owner of the new post to the value of req.user._id
        });

        const savedPost = await newPost.save(); // Save the new post to the database
        res.status(201).json(savedPost); // Send a JSON response with the saved post
    } catch (err) {
        res.status(400).json({ message: err.message }); // Send a JSON response with an error message if an error occurs
    }
});

// GET /api/posts/:topic - Get posts by topic
// This route handles the GET request to retrieve posts based on a specific topic
router.get('/:topic', verifyToken, async (req, res) => {
    try {
        const posts = await Post.find({ topic: req.params.topic }); // Find posts in the database that match the specified topic
        res.json(posts); // Send a JSON response with the retrieved posts
    } catch (err) {
        res.status(500).json({ message: err.message }); // Send a JSON response with an error message if an error occurs
    }
});

// PUT /api/posts/:id/like - Like a post
// This route handles the PUT request to like a post. It expects the request parameter to contain
// the ID of the post. The authenticated user's ID is added to the likes array of the post if it's not already there. 
router.put('/:id/like', verifyToken, async (req, res) => {
    try {
        const { expired, message, post } = await checkAndUpdatePostExpiration(req.params.id);

        if (expired) {
            return res.status(400).json({ message });
        }

        if (!post.likes.includes(req.user._id)) {
            await post.updateOne({ $push: { likes: req.user._id } });
            res.status(200).json("The post has been liked"); // Send a success message
        } else {
            res.status(400).json("You already liked this post"); // Send an error message if the user has already liked the post
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PUT /api/posts/:id/dislike - Dislike a post
// This route handles the PUT request to dislike a post. It expects the request parameter to contain
// the ID of the post. The authenticated user's ID is added to the dislikes array of the post if it's not already there. 
router.put('/:id/dislike', verifyToken, async (req, res) => {
    try {
        const { expired, message, post } = await checkAndUpdatePostExpiration(req.params.id);

        if (expired) {
            return res.status(400).json({ message });
        }

        if (!post.dislikes.includes(req.user._id)) {
            await post.updateOne({ $push: { dislikes: req.user._id } });
            res.status(200).json("The post has been disliked"); // Send a success message
        } else {
            res.status(400).json("You already disliked this post"); // Send an error message if the user has already disliked the post
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST /api/posts/:id/comment - Add a comment to a post
// This route handles the POST request to add a comment to a post. It expects the request parameter to contain
// the ID of the post and the request body to contain the comment text. The authenticated user's ID and the comment are added to the comments array of the post. 
router.post('/:id/comment', verifyToken, async (req, res) => {
    try {
        // Check if the post has expired
        const { expired, message } = await checkAndUpdatePostExpiration(req.params.id);
        if (expired) {
            return res.status(400).json({ message });
        }

        // Proceed to add a comment if the post is not expired
        const comment = {
            user: req.user._id,
            comment: req.body.comment,
            timestamp: new Date()
        };

        await Post.findByIdAndUpdate(req.params.id, { $push: { comments: comment } });
        res.status(200).json("Comment added successfully");
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET /api/posts/most-active/:topic - Get the most active post by topic
// This route handles the GET request to retrieve the most active post based on a specific topic.
// It expects the request parameter to contain the topic.
router.get('/most-active/:topic', verifyToken, async (req, res) => {
    try {
        // Find all posts with the specified topic
        const posts = await Post.find({ topic: req.params.topic });

        // Sort the posts based on the total number of likes and dislikes
        const sortedPosts = posts.sort((a, b) => (b.likes.length + b.dislikes.length) - (a.likes.length + a.dislikes.length));

        // Get the most active post, which is the first post in the sorted array
        const mostActivePost = sortedPosts[0] || null; // Handle case where there are no posts

        // Send the most active post as a JSON response
        res.json(mostActivePost);
    } catch (err) {
        // Handle any errors by sending a JSON response with the error message
        res.status(500).json({ message: err.message });
    }
});



// GET /api/posts/expired/:topic - Get expired posts by topic
// This route handles the GET request to retrieve expired posts based on a specific topic.
// It expects the request parameter to contain the topic.
router.get('/expired/:topic', verifyToken, async (req, res) => {
    try {
        // Fetch posts that have a status of 'Expired' and match the specified topic
        const expiredPosts = await Post.find({ topic: req.params.topic, status: 'Expired' });
        res.json(expiredPosts);
    } catch (err) {
        // Handle any errors by sending a JSON response with the error message
        res.status(500).json({ message: err.message });
    }
});



module.exports = router;
