var jwt = require('jsonwebtoken');
const JWT_SECRET='Harryisagood$boy';

const express = require('express');
//const User = require('../models/User');
const router = express.Router();

var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');
//  var fetchuser = require('../middleware/fetchuser');
// const JWT_SECRET='Harryisagood$boy';

//Route 3:Get loggedin user details  : post "/api/auth/getuser", Login required 


//Fwtching user function with req, res, next parameter - next is nota a part of java script it is a third function 
const fetchuser = (req, res, next) => {
    //Get the user from the jwt token and add id to req object 
    //taking token from header 
    const token = req.header('auth-token'); //token name - auth- token)
    // console.log(token)
    
    if (!token) {
        res.status(401).send({ error: "Token is NULL" })
    }
    try {
        // verifying token 
        const data = jwt.verify(token, JWT_SECRET);
        req.user=data.user;

        // Going back to route function using next()
        next();

    } catch(error) {
        res.status(401).send({ error: "Please authenticate a valid token" })
    }

}

module.exports = fetchuser;
