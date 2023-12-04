// Importing necessary modules
const jwt = require('jsonwebtoken');

// Defining the auth middleware function
function auth(req, res, next) {
    // Retrieving the token from the request header
    const token = req.header('auth-token');
    
    // If token is not present, return an error response
    if (!token) return res.status(401).send('Access Denied');

    try {
        // Verify the token using the secret key
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        // Add the verified user's id to the request object
        req.user = verified;
        // Call the next middleware function
        next();
    } catch (err) {
        // If token is invalid, return an error response
        res.status(400).send('Invalid Token');
    }
}

// Exporting the auth middleware function
module.exports = auth;
