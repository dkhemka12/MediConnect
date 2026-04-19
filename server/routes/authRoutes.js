const express = require("express");// This is required because

const { register, login } = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);// Define a POST route for user registration that calls the register function from the authController.  It is responsible for handling incoming registration requests, validating the data, creating a new user in the database, and returning a response to the client.
router.post("/login", login);// Define a POST route for user login that calls the login function from the authController. It is responsible for handling incoming login requests, validating the credentials, authenticating the user, and returning a response with a JWT token if the login is successful.

module.exports = router;

//The whole point of this file is to define the authentication routes for the application. We import the necessary modules, including Express and the authentication controller functions (register and login).
//  We create a new router instance and define two POST routes: one for user registration (/register) and one for user login (/login).
//  Each route is associated with its respective controller function. Finally, we export the router to be used in the main server file (server.js) where it will be mounted on the /api/auth path. This allows us to handle authentication-related requests in a structured way.