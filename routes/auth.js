// Require the express module
const express = require('express');

// Create a new router object
const router = express.Router();

// Import the user model we created
const User = require('../models/User');

// Import the bcryptjs module
const bcrypt = require('bcryptjs');

// Import the jsonwebtoken module
const jwt = require('jsonwebtoken');

// Import the validation functions
const { registerValidation, loginValidation } = require('../validations/validation');

// Register route
router.post('/register', async (req, res) => {

    // Validate user registration data
    const { error } = registerValidation(req.body);
    
    // If there is an error, send an error message and exit the function
    if (error) {
        res.status(400).send({ message: error.details[0].message });
        console.error({ message: error.details[0].message });
        return; 
    }

    // Check if user already exists
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) {
        res.status(400).send({ message: 'Email already exists' });
        console.error({ message: 'Email already exists' });
        return; 
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user object with the provided data
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    });
    try{
        // Save the user to the database
        const savedUser = await user.save();
        res.send(savedUser);
        console.log("User " + req.body.username +  " saved successfully");
    } catch (error) {
        console.error(error);
        res.status(400).send({ message: error });
    }
});


// Login route
router.post('/login', async (req, res) => {
    
    // Validate user login data
    const { error } = loginValidation(req.body);
    if (error) {
        res.status(400).send({ message: error.details[0].message });
        console.error({ message: error.details[0].message });
        return; 
    }

    // Check if user exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        res.status(400).send({ message: 'User does not exist' });
        console.error({ message: 'User does not exist' });
        return; 
    }

    // Check if password is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        res.status(400).send({ message: 'Invalid password' });
        console.error({ message: 'Invalid password' });
        return; 
    }

    // Generate and assign a token
    const token = jwt.sign({_id:user._id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send({'auth-token': token});


});

module.exports = router;

