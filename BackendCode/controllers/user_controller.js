  const userSchema = require("../Models/user_schema");
  const usermailSchema = require("../Models/user_schema");
  const bcrypt = require("bcrypt");
  const jsonwebtoken = require("jsonwebtoken");
  const SECRETE_KEY = "USERS";

  const Login = async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log("Email:", email);
      console.log("Password:", password);
      
      let user = await userSchema.findOne({ email: email });
      console.log("User:", user);
      
      if (!user) {
        console.log("Email not found!");
        return res.json({ message: "Email or Password Invalid!" });
      }
      
      let checkPassword = await bcrypt.compare(password, user.password);
      if (!checkPassword) {
        console.log("Invalid Password!");
        return res.json({ message: "Email or Password Invalid!" });
      }
      
      let userId = user.id;
      let token = await jsonwebtoken.sign({ id: userId }, SECRETE_KEY);
      console.log("Login successful!");
      
      return res.json({
        message: "Login successful!",
        success: true,
        id : user._id,
        loggedInUser: user,
        authToken: token,
      });
      
    } catch (err) {
      console.log("Error occurred:", err);
      return res.json({ error: err });
    }
  };

  const Verification = async (req, res) => {
    // try {
    //   const { email } = req.body;
    //   let newEmail = await new usermailSchema({
    //     email,
    //   });
    //   let savedEmail = await newEmail.save();
    //   console.log(" registered successfully");
    //   res.json({
    //     success: true,
    //     message: " registered successfully",
    //     admin: savedEmail,
    //   });
    // } catch (err) {
    //   console.log("Error occurred" + err);
    //   res.json({ error: err });
    // }
  };

  const getAllEmails = async (req, res) => {
    let userData = await usermailSchema.find();
    console.log("Users information fetched from database");
    res.json({ message: "All user info fetched from database", users: userData });
  };

  const InsertUsers = async (req, res) => {
    try {
      const { name, phone, email, password } = req.body;
      const profile = req.file?.filename;
      let checkEmail = await userSchema.findOne({ email: email });
      if (checkEmail) {
        console.log("Email already exists!");
        return res.json({ message: "Email already exists!" });
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        let newUser = await new userSchema({
          name,
          phone,
          email,
          password: hashedPassword,
          profile,
        });
        let savedUser = await newUser.save();
        console.log(" registered successfully");
        const token = jsonwebtoken.sign({ email: email }, SECRETE_KEY);
        res.json({
          success: true,
          message: " registered successfully",
          admin: savedUser,
          authToken: token
        });
      }
    } catch (err) {
      console.log("Error occurred" + err);
      res.json({ error: err });
    }
  };


  const getAllUsers = async (req, res) => {
    let userData = await userSchema.find();
    console.log("Users information fetched from database");
    res.json({ message: "All user info fetched from database", users: userData });
  };

  // const updateUser = async (req, res) => {
  //   let user = await userSchema.findById(req.params.id);
  //   if (!user) {
  //     console.log("User not found with this ID!");
  //     res.json({ message: "User not found with '" + req.params.id + "' ID!" });
  //   } else {
  //     const { name, email, address, phone} = req.body;
  //     const profile = req.file?.filename;
  //     let updateUser = {};
  //     if (name) {
  //       updateUser.name = name;
  //     }
  //     if (email) {
  //       updateUser.email = email;
  //     }
  //     if (phone) {
  //       updateUser.phone = phone;
  //     }
  //     if (address) {
  //       updateUser.address = address;
  //     }
  //     if (profile) {
  //       updateUser.profile = profile;
  //     }
  //     user = await userSchema.findByIdAndUpdate(
  //       req.params.id,
  //       { $set: updateUser },
  //       { new: true }
  //     );
  //     console.log("user info updated successfully");
  //     res.json({ message: "User info updated successfully", data: user });
  //   }
  // };

  const updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, address, phone, profile } = req.body; // Update with the fields you want to allow users to update
      let updateUser = {}; // Object to hold updated user fields
  
      // Add fields to updateUser object if they are present in the request body
      if (name) updateUser.name = name;
      if (email) updateUser.email = email;
      if (address) updateUser.address = address;
      if (phone) updateUser.phone = phone;
      if (profile) updateUser.profile = profile;
  
      // Find and update user in the database
      const updatedUser = await userSchema.findByIdAndUpdate(
        id,
        { $set: updateUser },
        { new: true } // Return the updated user
      );
  
      // Send response
      res.json({ message: "User info updated successfully", data: updatedUser });
    } catch (error) {
      console.error("Error updating user info:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  

  const updatePassword = async (req, res) => {
    try {
      const { id } = req.params;
      // console.log(id)
      const { currentPassword, newPassword } = req.body;

      // Find the user by ID
      const user = await userSchema.findById(id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Compare current password with the password stored in the database
      const isMatch = await bcrypt.compare(currentPassword, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Current password is incorrect" });
      }

      // Hash the new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      // Update the user's password
      await userSchema.findByIdAndUpdate(
        id,
        { password: hashedPassword },
        { new: true }
      );

      return res.json({ message: "Password updated successfully" });
    } catch (error) {
      console.error("Error updating password:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  const deleteUser = async (req, res) => {
    let user = await userSchema.findById(req.params.id);
    if (!user) {
      console.log("User not found with this ID!");
      res.json({ message: "User not found with '" + req.params.id + "' ID!" });
    } else {
      console.log(user);
      await userSchema.findByIdAndDelete(req.params.id);
      console.log("User info deleted successfully");
      res.json({ message: "user info deleted successfully", deletedUser: user });
    }
  };

  const viewSingleUser = async (req, res) => {
    let user = await userSchema.findById(req.params.id);
    if (!user) {
      res.json({ message: "user not found!" });
    } else {
      res.json({ user: user });
    }
  };

  module.exports = {
    Login,
    InsertUsers,
    getAllUsers,
    updateUser,
    deleteUser,
    viewSingleUser,
    Verification,
    getAllEmails,
    updatePassword
  };
