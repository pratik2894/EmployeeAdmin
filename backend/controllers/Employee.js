import Admin from "../models/Admin.js";
import Employee from "../models/Employee.js";
import express from "express";
import isAuthenticated from "../middleware/Auth.js";
import cloudinary from "cloudinary";
import upload from "../utils/multer-config.js";
const EmployeeRouter = express.Router();

// Cloudinary configuration
cloudinary.config({
  cloud_name: "dxhpr7jz1",
  api_key: "162366148733813",
  api_secret: "U0jJs6laKmc9j0UEDQWihkaKDLk",
});

const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

function isEmailValid(email) {
  // Check if the email is defined and not too long
  if (!email || email.length > 254) return false;

  // Use a single regex check for the standard email parts
  if (!emailRegex.test(email)) return false;

  // Split once and perform length checks on the parts
  const parts = email.split("@");
  if (parts[0].length > 64) return false;

  // Perform length checks on domain parts
  const domainParts = parts[1].split(".");
  if (domainParts.some((part) => part.length > 63)) return false;

  // If all checks pass, the email is valid
  return true;
}

EmployeeRouter.post(
  "/create",
  upload.single("image"),
  isAuthenticated,
  async (req, res) => {
    try {
      const { first, last, email, mobile, Designation, gender, course } =
        req.body;

      if (
        !(first && last && email && mobile && Designation && gender && course)
      ) {
        return res.status(400).json({
          message: "Please enter all employee data",
        });
      }

      // Check for email validation
      const isemail = isEmailValid(email);
      if (!isemail) {
        return res.status(400).json({
          message: "Please enter a valid email",
        });
      }

      // Check if email or employee already exists
      const isExists = await Employee.findOne({ email });
      if (isExists) {
        return res.status(400).json({
          message: "Employee already exists",
        });
      }

      // Check if the file is available
      if (!req.file) {
        return res.status(400).json({
          message: "Please upload an image",
        });
      }

      // Upload image to Cloudinary
      const photo = await cloudinary.uploader.upload(req.file.path, {
        folder: "UserImages",
      });

      // Create the employee
      const employee = await Employee.create({
        first,
        last,
        email,
        mobile,
        Designation,
        gender,
        course,
        photo: photo.secure_url,
      });

      console.log(photo.secure_url);

      return res.status(200).json({
        message: "Employee created successfully",
        employee,
      });
    } catch (error) {
      console.error(error); // Log the error for debugging
      return res.status(500).json({
        error: error.message,
      });
    }
  }
);

// Update Employee Route

EmployeeRouter.put(
  "/update/:id",
  upload.single("image"),
  isAuthenticated,
  async (req, res) => {
    try {
      const { id } = req.params;
      const { first, last, email, mobile, Designation, gender, course } =
        req.body;

      if (
        !(first && last && email && mobile && Designation && gender && course)
      ) {
        return res.status(400).json({
          message: "Please enter all employee data",
        });
      }

      // Check for email validation
      const isemail = isEmailValid(email);
      if (!isemail) {
        return res.status(400).json({
          message: "Please enter a valid email",
        });
      }

      // Check if the employee exists
      const employee = await Employee.findById(id);
      if (!employee) {
        return res.status(404).json({
          message: "Employee not found",
        });
      }

      // Check if email is being changed and if the new email already exists
      if (employee.email !== email) {
        const isExists = await Employee.findOne({ email });
        if (isExists) {
          return res.status(400).json({
            message: "Email already exists",
          });
        }
      }

      let photoUrl = employee.photo; // Keep the existing photo URL

      // Check if a new file is uploaded
      if (req.file) {
        // Upload new image to Cloudinary
        const photo = await cloudinary.uploader.upload(req.file.path, {
          folder: "UserImages",
        });
        photoUrl = photo.secure_url;
      }

      // Update employee details
      employee.first = first;
      employee.last = last;
      employee.email = email;
      employee.mobile = mobile;
      employee.Designation = Designation;
      employee.gender = gender;
      employee.course = course;
      employee.photo = photoUrl;

      await employee.save();

      return res.status(200).json({
        message: "Employee updated successfully",
        employee,
      });
    } catch (error) {
      console.error(error); // Log the error for debugging
      return res.status(500).json({
        error: error.message,
      });
    }
  }
);

// Deleting the perticular user 

EmployeeRouter.delete("/delete/:id", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
  
      // Check if the employee exists
      const employee = await Employee.findById(id);
      if (!employee) {
        return res.status(404).json({
          message: "Employee not found",
        });
      }
  
      // Check if the employee has an associated photo
      if (employee.photo) {
        // Extract the public ID of the photo from its URL
        const photoUrl = employee.photo;
        const publicId = photoUrl.split('/').pop().split('.')[0];
        
        // Delete the photo from Cloudinary
        await cloudinary.uploader.destroy(`UserImages/${publicId}`, function(result) {
          console.log(result);
        });
      }
  
      // Delete the employee
      await Employee.findByIdAndDelete(id);
  
      return res.status(200).json({
        message: "Employee deleted successfully",
      });
    } catch (error) {
      console.error(error); // Log the error for debugging
      return res.status(500).json({
        error: error.message,
      });
    }
  });
  
// Get details of individual employee

EmployeeRouter.get("/details/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find the employee by ID
      const employee = await Employee.findById(id);
      if (!employee) {
        return res.status(404).json({
          message: "Employee not found",
        });
      }
  
      // Return the employee details
      return res.status(200).json({
        message: "Employee details fetched successfully",
        employee,
      });
    } catch (error) {
      console.error(error); // Log the error for debugging
      return res.status(500).json({
        error: error.message,
      });
    }
  });
  
  EmployeeRouter.get("/list", isAuthenticated, async (req, res) => {
    try {
      const { name, id, email, sortBy, order, page = 1, limit = 10 } = req.query;
  
      // Create a filter object
      const filter = {};
  
      // Add filters based on query parameters
      if (name) {
        filter.$or = [
          { first: { $regex: name, $options: 'i' } },
          { last: { $regex: name, $options: 'i' } },
        ];
      }
      if (id) {
        filter._id = id;
      }
      if (email) {
        filter.email = { $regex: email, $options: 'i' };
      }
  
      // Determine the sort criteria
      let sortCriteria = {};
      if (sortBy) {
        const sortFields = sortBy.split(','); // Split sortBy by commas to handle multiple fields
        sortFields.forEach((field) => {
          sortCriteria[field] = order === 'desc' ? -1 : 1;
        });
      } else {
        // Default sort by ID if no sortBy parameter is provided
        sortCriteria = { _id: 1 };
      }
  
      const options = {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        sort: sortCriteria,
      };
  
      const employees = await Employee.paginate(filter, options);
  
      return res.status(200).json({
        message: "Employees fetched successfully",
        employees: employees.docs,
        totalPages: employees.totalPages,
        currentPage: employees.page,
      });
    } catch (error) {
      console.error(error); // Log the error for debugging
      return res.status(500).json({
        error: error.message,
      });
    }
  });
  
  
  
  

export default EmployeeRouter;
