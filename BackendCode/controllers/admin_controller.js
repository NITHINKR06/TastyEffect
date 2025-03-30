const adminSchema = require("../Models/Admin");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const SECRETE_KEY = "USERS";

const Register = async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;
    const profile = req.file?.filename;
    let checkEmail = await adminSchema.findOne({ email: email });
    if (checkEmail) {
      console.log("Email already exists!");
      res.json({ message: "Email already exists!" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      let newAdmin = await new adminSchema({
        name,
        email,
        password: hashedPassword,
        profile,
      });
      let savedAdmin = await newAdmin.save();
      console.log("New Admin registered successfully");
      res.json({
        success: true,
        message: "New Admin registered successfully",
        admin: savedAdmin,
      });
    }
  } catch (err) {
    console.log("Error occurred" + err);
    res.json({ error: err });
  }
};
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await adminSchema.findOne({ email: email });
    if (!user) {
      console.log("Email not found!");
      res.json({ message: "Email or Password Invalid!" });
    } else {
      let checkPassword = await bcrypt.compare(password, user.password);
      if (!checkPassword) {
        console.log("Invalid Password!");
        res.json({ message: "Email or Password Invalid!" });
      } else {
        let userId = user.id;
        let token = await jsonwebtoken.sign(userId, SECRETE_KEY);
        console.log("Login successful!");
        res.json({
          message: "Login successful!",
          success: true,
          loggedInUser: user,
          authToken: token,
        });
      }
    }
  } catch (err) {
    console.log("Error occurred" + err);
    res.json({ error: err });
  }
};

const GetAllAdmins = async (req, res) => {
  try {
    // Fetch all admin documents from the database
    const allAdmins = await adminSchema.find();

    // Check if there are any admins
    if (allAdmins.length === 0) {
      console.log("No admins found");
      return res.json({ message: "No admins found" });
    }

    // Return the list of admins
    console.log("Admins retrieved successfully" , allAdmins);
    res.json({ success: true, admins: allAdmins });
  } catch (err) {
    console.log("Error occurred: " + err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = { Register, Login, GetAllAdmins };
