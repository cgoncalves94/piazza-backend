# Piazza Backend

## Project Description

The Piazza backend, developed using Node.js and Express, acts as the core logic for the Piazza social media platform. This backend, a vital component of our full-stack application, offers RESTful API services, combining secure, scalable, and efficient server-side operations with a MongoDB database. As part of the Cloud Computing Concepts module at Birkbeck University, this project not only demonstrates modern cloud application development techniques but also integrates seamlessly with our frontend. For a comprehensive view of the entire application, visit the frontend repository at [https://github.com/cgoncalves94/piazza-frontend].

## Key Features

- **JWT Authentication:** Manages user sessions and secures endpoints with JSON Web Tokens.
- **MongoDB Integration:** Efficient data storage and retrieval with MongoDB, a powerful NoSQL database.
- **RESTful API Endpoints:** Comprehensive API endpoints for managing users, posts, and interactions.
- **Data Validation:** Robust validation with Joi to maintain data integrity and prevent security issues.
- **Docker Integration:** Containerized application deployment ensuring consistency across environments.
- **CI/CD with GitHub Actions:** Automated workflows for continuous integration and deployment, improving code quality and deployment efficiency.

## Technologies and Libraries

- **Node.js & Express.js:** Core technologies for building and running the web application.
- **MongoDB & Mongoose:** Database management and schema modeling.
- **Bcrypt.js:** Password hashing for increased security.
- **Dotenv:** Environment variable management.
- **Joi:** Data validation library.
- **Docker:** Application containerization.
- **GitHub Actions:** Automation of workflows for testing, building, and deploying applications.

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

## Docker Deployment

To containerize the Piazza backend:

1. Ensure Docker is installed on your system.
2. Build the Docker image using `docker build -t piazza-backend .`
3. Run the container with `docker run -p 80:3000 piazza-backend`

## Continuous Integration and Deployment

This project uses GitHub Actions for CI/CD to automate testing and deployment. The `.github/workflows` directory contains the workflow definitions that:

- Build and push the Docker image to a container registry.
- Deploy the application to the production environment upon merge to the main branch.

## Environment Variables

- `DB_CONNECTOR`: The database connector used to establish a connection with the MongoDB database.
- `TOKEN_SECRET`: A secret key for JWT signing.

## Database Schema

- **User**: Schema includes `username`, `email`, `password`, and timestamps.
- **Post**: Schema includes `title`, `body`, `topic`, `status`, `owner`, `likes`, `dislikes`, `comments`, and timestamps.

## Credits

Developed by Cesar Goncalves for the Cloud Computing Concepts module at BSc Computer Science, Birkbeck University. This project encompasses the application of cloud computing principles, containerization, and continuous delivery practices to create a scalable, maintainable, and secure backend service.

