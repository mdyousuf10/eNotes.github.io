const express = require('express');
const User = require('../models/userSchema');
const router = express.Router();
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');
const { json } = require('express');
const JWT_SECRET='Harryisagood$boy';

//Route 1:create a user using : post "/api/auth/createuser", Doesn't require Auth
//No login required/ use-createuser

router.post('/createuser', [
    //below 3 lines are for validations 
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res)=>{
    // if there are errors, return bad request and errors 
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    } 
    //check wheather the user with this emai exist already 
    try{

    
    let user = await User.findOne({email: req.body.email});
    if(user){
        return res.status(400).json({success, error: "Sorry a user with this email already exist"});
    }
    //Bcrypt is used to convert password into hash code 
    //await- stop first resolve this line and then go to next line
    const salt = await bcrypt.genSalt(10);
    //secPass - secure password with hash and salt 
    secPass = await bcrypt.hash(req.body.password,salt);

    // create a new user 
    user = User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      const data = {
        user:{
            id: user.id
        }
      }
      //JWT(jason web token is used to create token of users data )
      const authtoken = jwt.sign(data, JWT_SECRET);
    //   res.json(User);
    success=true;
      res.json({success, authtoken})
      //catch errors 
    }catch(error){
        console.error(error.message)
        res.status(500).send('some error occure ')
    }
   
})

//Route 2:create a user login endpoint using : post "/api/auth/login", Requires authintication

router.post('/login', [
    //below 3 lines are for validations 
   
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password is cannot be blank').isLength({ min: 5 }),
], async (req, res)=>{
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } 

    const {email, password}=req.body;
    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error: 'Please try again with correct credentials'})
        }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare){
        success=false   
        return res.status(400).json({success, error: 'Please try again with correct credentials'});
    }

    const data = {
        user:{
            id: user.id
        }
      }

    const authtoken = jwt.sign(data, JWT_SECRET);
    success=true;
    res.json({success, authtoken})
    }catch(error){
        console.error(error.message)
        res.status(500).send('Internal Server Error')
    }

})

// route 3: 

router.post('/getuser', fetchuser, async (req, res) =>{
    try {
        userId=req.user.id;//user.id is getting id from payload which we have created earlier named as data
        // Storing user data except password is stored in userDetails varible - to exclude password we have used .select() function
        const userDetails = await User.findById(userId).select("-password")
        res.send(userDetails)//sending data as response
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }
})

module.exports = router
