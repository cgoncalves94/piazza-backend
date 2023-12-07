// Importing the express
const express = require('express');
// Creating the express app
const app = express();
// Importing the MURL
require('dotenv').config();
// Importing the mongoose
const mongoose = require('mongoose');
// Importing the body-parser
const bodyParser = require('body-parser');

// Importing the routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

// Importing the cors
const cors = require('cors');


// Define CORS options if necessary (this was necessary for me test the app wih my frontend in React which is under development)
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    };

  // Then use the cors middleware before your routes
app.use(cors(corsOptions));

// Middleware
app.use(bodyParser.json());
app.use('/api/users', authRoute);
app.use('/api/posts', postRoute);

// Homepage route
app.get('/', (req, res) => {
    res.send('Piazza App - by Cesar Goncalves');
});

// Mongoose connection to MongoDB 
mongoose.connect(process.env.DB_CONNECTOR)
    .then(() => {
        console.log('connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB', err);
    });
    
// Server listening
app.listen(3000, () => {
    console.log('server is up and running');
});
