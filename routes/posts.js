// Importing express module
const express = require('express');

// Creating a router object
const router = express.Router();

// Importing Post model
const Post = require('../models/Post');

// Importing verify function
const verifyToken = require('../verifyToken');

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
            res.status(200).json("The post has been liked");
        } else {
            res.status(400).json("You already liked this post");
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
router.post('/:id/comment', async (req, res) => {
    try {
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
router.get('/most-active/:topic', async (req, res) => {
    try {
        const posts = await Post.find({ topic: req.params.topic });
        const mostActivePost = posts.sort((a, b) => (b.likes.length + b.dislikes.length) - (a.likes.length + a.dislikes.length))[0];
        res.json(mostActivePost);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// GET /api/posts/expired/:topic - Get expired posts by topic
router.get('/expired/:topic', async (req, res) => {
    try {
        const expiredPosts = await Post.find({ topic: req.params.topic, expirationTime: { $lt: new Date() } });
        res.json(expiredPosts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;
