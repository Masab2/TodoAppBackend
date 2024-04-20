const User = require("../Models/user");
const jwt = require("jsonwebtoken");

// Handel The User Sign Up Function
async function handleUserSignUp(req, res, next) {
  const { name, email, password } = req.body;
  console.log(req.body);
  var newUser;
  try {
    // Create a new user instance
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    } else {
      newUser = new User({
        name,
        email,
        password,
      });
    }

    // Save the user to the database
    const savedUser = await newUser.save();

    console.log("User created successfully:", savedUser);
    return res.status(200).json({ Status: "Account Created Successfully" });
  } catch (error) {
    console.log(error);
  }
}

// Handel The User Login Function
async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  try {
    const entry = await User.findOne({
      email,
      password,
    });
    if (!entry) {
      return res.status(200).json({ Status: "User Not Exist" });
    } else if (entry.email !== email || entry.password !== password) {
      return res.status(200).json({ Status: "User Not Exist" });
    } else {
      console.log(entry);
      let tokenData = { _id: entry._id, email: entry.email };
      const token = jwt.sign(tokenData, "secretkey", { expiresIn: "1h" });
      return res
        .status(200)
        .json({
          Status: true,
          token: token,
          Success: "Login Successfully",
          Id: entry._id,
          Name: entry.name,
          Email: entry.email,
        });
    }
  } catch (error) {
    console.log(error);
  }
}

// Get the User Data From the Database of the Specific User
async function handleGetUserData(req, res) {
  const { userId } = req.query;
  console.log(req.query);
  if (!userId) {
    return res.status(400).json({ error: "Please Enter the User ID" });
  } else {
    const result = await User.findById(userId);
    return res.status(200).json({ Status: true, Success: result });
  }
}

// Exports The Function
module.exports = {
  handleUserSignUp,
  handleUserLogin,
  handleGetUserData,
};
