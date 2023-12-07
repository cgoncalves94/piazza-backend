// Import the mongoose library
const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3, // Minimum length of 3 characters for the username
        max: 256 // Maximum length of 256 characters for the username
    },
    email: {
        type: String,
        required: true,
        min: 3, // Minimum length of 3 characters for the email
        max: 256 // Maximum length of 256 characters for the email
    },
    password: {
        type: String,
        required: true,
        min: 6, // Minimum length of 6 characters for the password
        max: 1024 // Maximum length of 1024 characters for the password
    },
    date: {
        type: Date,
        default: Date.now // Default value for the date field is the current date and time
    }
});

// Export the User model
module.exports = mongoose.model('User', userSchema);
