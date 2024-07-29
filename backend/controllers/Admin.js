import Employee from "../models/Employee.js";
import Admin from "../models/Admin.js";
import express from "express";
import sendToken from "../utils/SendToken.js";
const AdminRouter = express.Router();

// Admin Login
AdminRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email || password)) {
      res.status(400).json({
        message: "Fields cannot be Empty",
      });
    }
    // Find the Admin with given Email
    const admin = await Admin.findOne({email});
    if (!admin) {
      return res.status(404).json({
        message: "Email not registered",
      });
    }
    // Cheack for the password
    if (admin.Password !== password) {
      return res.status(400).json({
        message: "Please Enter correct password",
      });
    }else{
        sendToken(admin , 200 , res , "logged in")
    }
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});


export default AdminRouter;