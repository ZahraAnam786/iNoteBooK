
const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');


//Creating a user using POST: "/api/auth/", Doesn't require Auth
router.post('/', async (req, res) =>{
   console.log(req.body);
   const user = User(req.body);
   try {
    await user.save();
    res.status(201).send(user); // Respond with the created user and status code 201
  } catch (err) {
    console.error('Error saving user:', err.message);
    res.status(500).send({ error: 'Error saving user' }); // Send an error response with status code 500
  }
});


module.exports = router