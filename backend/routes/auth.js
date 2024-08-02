const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");

//Creating a user using POST: "/api/auth/", Doesn't require Auth
router.post(
  "/create-user",
  [
    body("name", "Enter a valid name.").isLength({ min: 3 }),
    body("email", "Enter a valid email.").isEmail(),
    body("password", "Password must be atleast 5 characters.").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    console.log(req.body);
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email is already exist." });
      }

      user = await User.create({
        name : req.body.name,
        email: req.body.email,
        password: req.body.password
      }).then(user => res.json(user));
      
      
    } catch (err) {
      console.error("Error saving user:", err.message);
      res.status(500).send({ error: "Error saving user" }); // Send an error response with status code 500
    }
  }
);

module.exports = router;
