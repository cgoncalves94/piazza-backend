# Piazza Backend

## Project Description

The Piazza backend is built using Node.js and Express, forming the core logic of the Piazza social media platform. It facilitates RESTful API services, ensuring secure, scalable, and efficient server-side interactions with a MongoDB database. This backend was developed as part of the coursework for Cloud Computing Concepts at Birkbeck University.

## Key Features

- **JWT Authentication:** Securely handles user sessions with JSON Web Tokens.
- **MongoDB Integration:** Leverages MongoDB for efficient data storage and retrieval.
- **RESTful API Endpoints:** A complete suite of endpoints for user and post management.
- **Data Validation:** Ensures robust input validation to prevent security breaches.

## Technologies and Libraries

- **Node.js:** The JavaScript runtime environment for building the server-side application.
- **Express.js:** The web application framework for creating API endpoints.
- **MongoDB:** The database for storing application data.
- **Mongoose:** Object Data Modeling (ODM) library for MongoDB and Node.js.
- **Bcrypt.js:** For password hashing.
- **Dotenv:** To load environment variables from an `.env` file into `process.env`.
- **Joi:** For schema description and data validation.

## API Endpoints

- `POST /api/users/register`: Registers a new user.
- `POST /api/users/login`: Authenticates a user and issues a JWT.
- `GET /api/posts`: Retrieves all posts.
- `GET /api/posts/:topic`: Retrieves posts filtered by a specific topic.
- `GET /api/posts/expired/:topic`: Retrieves all expired posts by topic.
- `GET /api/posts/active/:topic`: Retrieves the most active post in a specific topic based on the number of likes and dislikes.
- `POST /api/posts`: Creates a new post.
- `PUT /api/posts/:id/like`: Records a 'like' on a post.
- `PUT /api/posts/:id/dislike`: Records a 'dislike' on a post.
- `POST /api/posts/:id/comment`: Adds a comment to a post.

## Setup and Installation

1. Clone the repository to your local machine.
2. Navigate to the cloned directory.
3. Install the necessary npm packages using `npm install`.
4. Create an `.env` file with the required environment variables.
5. Start the server with `npm start`.

## Environment Variables

- `DB_CONNECTOR`: The database connector used to establish a connection with the MongoDB database.
- `TOKEN_SECRET`: A secret key for JWT signing.

## Database Schema

- **User**: Schema includes `username`, `email`, `password`, and timestamps.
- **Post**: Schema includes `title`, `body`, `topic`, `status`, `owner`, `likes`, `dislikes`, `comments`, and timestamps.

## Credits

This backend application was developed by Cesar Goncalves as part of the Cloud Computing Concepts module at BSc Computer Science, Birkbeck University. It is intended to demonstrate the practical application of cloud-based service deployment and management.

