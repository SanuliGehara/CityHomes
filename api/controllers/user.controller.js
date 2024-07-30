import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";

export const test = (req, res) => {
  res.json({ message: "Hello World!" });
};

// UPDARE A USER
export const updateUser = async (req, res, next) => {
  // if unauthorized user
  if (req.user.id !== req.params.id)
    return next(
      errorHandler(401, "You are not allowed to update this profile")
    );

  try {
    // hash updated password
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    // seperate pssword
    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  //check if user is invalid
  if (req.user.id !== req.params.id) {
    return next(error(401, "You can not delete this account!"));
  }

  try {
    await User.findByIdAndDelete(req.params.id);
    //delete cookie
    res.clearCookie("access_token");
    // make a response
    res.status(200).json("User has been deleted!");
  } catch (error) {
    next(error);
  }
};
