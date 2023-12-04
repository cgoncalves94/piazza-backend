// Importing the Joi library for data validation
const joi = require('joi');

// Function to validate registration data
const registerValidation = (data) => {
    // Defining the validation schema using Joi
    const schema = joi.object({
        username: joi.string().required().min(3).max(256), // Validating the username field
        email: joi.string().required().min(3).max(256).email(), // Validating the email field
        password: joi.string().required().min(6).max(1024) // Validating the password field
    });
    return schema.validate(data); // Validating the provided data against the schema
}

// Function to validate login data
const loginValidation = (data) => {
    // Defining the validation schema using Joi
    const schema = joi.object({
        email: joi.string().required().min(3).max(256).email(), // Validating the email field
        password: joi.string().required().min(6).max(1024) // Validating the password field
    });
    return schema.validate(data); // Validating the provided data against the schema
}

// Exporting the validation functions
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;