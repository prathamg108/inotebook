const express = require("express");
const router = express.Router();
const User = require("../model/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser=require('../middleware/fetchuser')
const JWT_SECRET = "helloWorld";

//create a user using POST "/api/auth/createuser". NO login required
router.post(
  "/createuser",
  [
    body("email", "Enter valid email").isEmail(),
    body("name", "User cannot be blank").isLength({ min: 5 }),
    body("password", "Password cannot be blank").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: success,errors: errors.array() });
    }
    try {
      // checking whether email is unique or not
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({success: success, error: "Email already exist" });
      }
      //adding security to password using salt
      const salt = await bcrypt.genSalt(10);
      const SecPass = await bcrypt.hash(req.body.password, salt);
      //create new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: SecPass,
      });
      const data = { 
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success =true;
      res.json({success: success, user });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error occured");
    }
  }
);

//create a user using POST "/api/auth/login". NO login required

router.post(
  "/login",
  [
    body("email", "Enter valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    let success=false;
    if (!errors.isEmpty()) {
      return res.status(400).json({success:success, errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({success:success, error: "Please try to login with correct credntial" });
      }
      const passCompare = await bcrypt.compare(password, user.password);
      if (!passCompare) {
        return res
          .status(400)
          .json({success:success, error: "Please try to login with correct credntial" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success=true;
      res.json({ success:success,authToken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error occured");
    }
  }
);

//create a user using POST "/api/auth/getuser".login required

router.post(
  "/getuser",fetchuser,async (req, res) => {
    try {
      const userId=req.user.id;
      const user=await User.findById(userId).select("-password");
      res.send(user)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Problem")
    }
  })

module.exports = router;
