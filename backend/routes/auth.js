const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/FetchUser');
const JWT_SECRET = "AnamisgoodG$irl";

//Route 1: Creating a user using POST: "/api/auth/create-user", Doesn't require Auth
router.post(
  "/create-user",
  [   // Apply validations
    body("name", "Enter a valid name.").isLength({ min: 3 }),
    body("email", "Enter a valid email.").isEmail(),
    body("password", "Password must be atleast 5 characters.").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    //check validation error
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    try {
      //check wheather user is already exist in database
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email is already exist." });
      }

      //Password Hashing

      //For Async
      // var salt = await bcrypt.genSalt(10);
      // var hash = await bcrypt.hash("B4c0/\/", salt);

      //For Sync
      var salt =  bcrypt.genSaltSync(10);
      var secretPassword = bcrypt.hashSync(req.body.password, salt);

      // Save data in databae
      user = await User.create({
        name : req.body.name,
        email: req.body.email,
        password: secretPassword
      })
      
      if(res.status(201)){
        const data ={
          user:{
            id: user.id
          }
        }

        // Get jwt token with secretkey
        var token = jwt.sign(data , JWT_SECRET);
        res.status(201).json({message: "User save successfully", auth_token: token})

      }
      
    } catch (err) {
      console.error("Error saving user:", err.message);
      if (!res.headersSent) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  }
);

//Route 2: Authenticate a user using POST: "/api/auth/Authenticate-user", Require Auth
router.post(
  "/login",
  [   // Apply validations
    body("email", "Enter a valid email.").isEmail(),
    body("password", "Password cannot be blank.").exists()
  ],
  async (req, res) => {
    //check validation error
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    try {

      //destructure
      const{email, password} = req.body;

      //check wheather user is already exist in database
      let user = await User.findOne({email});
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials." });
      }
    
      //For check password hashes
      const ComparePwd = bcrypt.compareSync(password, user.password);
      if(!ComparePwd){
        return res
        .status(400)
        .json({ error: "Please try to login with correct credentials." });
      }

      const data ={
        user:{
          id: user.id
        }
      }
       // Get jwt token with secretkey
      var token = jwt.sign(data , JWT_SECRET);
      res.status(201).json({message: "Login successfully", token: token})

      
    } catch (err) {
      console.error("Error saving user:", err.message);
      if (!res.headersSent) {
        res.status(500).json({ error: 'Internal Server Error'  });
      }
    }
  }
);

//Route 3: Get a user using POST: "/api/auth/Authenticate-user", Require Auth
router.post(
  "/getUser", fetchUser, async (req, res) => {
   
    try {
         //this id is come from fetchuser
         let userId = req.user.id;
         const user = await User.findById(userId).select("-password");  //All field fetch expect password
         res.json(user);  //return user information
   
    } catch (err) {
      console.error("Error saving user:", err.message);
      if (!res.headersSent) {
        res.status(500).json({ error: 'Internal Server Error'  });
      }
    }
  }
);

module.exports = router;
