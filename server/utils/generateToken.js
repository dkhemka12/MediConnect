const jwt = require("jsonwebtoken");// imported jwt module from the jsonwebtoken package to generate JSON Web Tokens for user authentication

// Now we will create a function called generateToken that takes a user object as an argument and generates a JWT token using the user's ID and role. The token is signed with a secret key from environment variables and has an expiration time also defined in environment variables. Finally, we export the generateToken function to be used in other parts of the application for user authentication.
// We will use the generateToken function in the authentication controller to create a token when a user logs in or registers, and this token will be sent back to the client to be stored and used for authenticated requests.

const generateToken = (user) => {// function to generate a JWT token for a given user

	return jwt.sign(// sign a new JWT token with the user's ID and role as the payload

		{// payload of the token includes the user's ID and role, which can be used to identify the user and their permissions in the application
			userId: user._id,
			role: user.role,
		},
        // the secret key used to sign the token is retrieved from environment variables, and the token is set to expire based on the value defined in environment variables (defaulting to 7 days if not specified)
		process.env.JWT_SECRET,

		{// options for the token, including the expiration time
			expiresIn: process.env.JWT_EXPIRES_IN || "7d",
		}
	);
};

module.exports = generateToken;

//The whole point of this file is to create a utility function that generates a JWT token for user authentication. This token can be used in the authentication process to verify the identity of the user and manage access to protected routes in the application. By exporting the generateToken function, we can easily use it in our authentication controllers whenever we need to create a token for a user.
