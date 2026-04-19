const express = require("express");

const { getUsers } = require("../controllers/userController");
// We import the Express module to create a router for handling user-related routes. We also import the getUsers function from the userController, which will be used to handle requests to fetch all users from the database. The router will define a GET route at the root path ("/") that calls the getUsers function when accessed. Finally, we export the router to be used in the main server file (server.js) where it will be mounted on the /api/users path.

const router = express.Router();

router.get("/", getUsers);

module.exports = router;
// The whole point of this file is to define the user-related routes for the application.
//  We import the necessary modules, including Express and the user controller function (getUsers). 
// We create a new router instance and define a GET route at the root path ("/") that calls the getUsers function from the userController. 
// This route is responsible for handling incoming requests to fetch all users from the database and return them in the response. Finally, we export the router to be used in the main server file (server.js) where it will be mounted on the /api/users path. This allows us to handle user-related requests in a structured way.