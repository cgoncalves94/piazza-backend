const Joi = require('joi');

// Function to validate post creation data
const createPostValidation = (data) => {
    const schema = Joi.object({
        title: Joi.string().required().min(3).max(256),
        body: Joi.string().required().min(3),
        topic: Joi.string().required().valid('Politics', 'Health', 'Sport', 'Tech'),
        expirationTime: Joi.number().positive().min(1).required()
    });
    return schema.validate(data);
}

// Function to validate comment data
const commentValidation = (data) => {
    const schema = Joi.object({
        comment: Joi.string().required().min(1).max(1024)
    });
    return schema.validate(data);
}

// Exporting functions
module.exports.createPostValidation = createPostValidation;
module.exports.commentValidation = commentValidation;
