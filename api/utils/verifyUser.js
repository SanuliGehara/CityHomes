import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next(errorHandler(401, "Unauthorized"));
  }

  //check if token is valid
  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) {
      return next(errorHandler(403, "Forbidden"));
    }

    req.user = user;
    next();
  });
};
