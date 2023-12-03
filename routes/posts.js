
const express = require('express');
const router = express.Router();

// POST /api/posts - Create a new post
router.post('/:create', async (req, res) => {
    try {
        const newPost = new Post({
            title: req.body.title,
            body: req.body.body,
            topic: req.body.topic,
            owner: req.user._id // Assuming you have user info in req.user
        });

        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// GET /api/posts/:topic - Get posts by topic
router.get('/:topic', async (req, res) => {
    try {
        const posts = await Post.find({ topic: req.params.topic });
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// PUT /api/posts/:id/like - Like a post
router.put('/:id/like', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.user._id)) { // Avoid duplicate likes
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
router.put('/:id/dislike', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.dislikes.includes(req.user._id)) { // Avoid duplicate dislikes
            await post.updateOne({ $push: { dislikes: req.user._id } });
            res.status(200).json("The post has been disliked");
        } else {
            res.status(400).json("You already disliked this post");
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
