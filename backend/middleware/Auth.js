import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

// cheack that the admin is authenticated successfully or not

const isAuthenticated = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Authorization header is missing" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token is missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRETE);
    req.admin = decoded; // Assuming the token contains the user information

    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

export default isAuthenticated;
