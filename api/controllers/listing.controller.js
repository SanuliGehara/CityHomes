import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteUserListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  //Check if listing exists or not
  if (!listing) {
    return next(errorHandler(404, "Listing not found"));
  }

  //If user is authenticated
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only delete your own listings"));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("Listing has been deleted");
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  //Check if listing exists or not
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, "Listing not found"));
  }

  // user aunthentication
  if (req.user.id !== listing.userRef) {
    return next(
      errorHandler(401, "You are not allowed to update this listing")
    );
  }
  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};
