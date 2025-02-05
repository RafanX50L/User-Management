import { Request, Response } from "express";
import User from "../models/User";

const updateData = async (req: Request, res: Response) => {
  console.log("entered to update Data");
  const { _id, name, phone, location, occupation, bio } = req.body;
  try {
    console.log(req.body);
    const user = await User.findById(_id);
    if (!user) {
      res.status(400).json({ message: "userNotExits" });
      return;
    }

    user.name = name;
    user.phone = phone;
    user.location = location;
    user.occupation = occupation;
    user.bio = bio;

    await user.save();

    console.log(user);

    res.status(201).json({ userData: user });

    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
    return;
  }
};

const fetchData = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const userData = await User.findById(id);

    if (!userData) {
      res.status(400).json({ message: "userNotExits" });
      return;
    }
    res.status(201).json({ userData });
    return;
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    return;
  }
};

const uploadProfileImage = async (req: Request, res: Response) => {
  console.log("entered to imageupload");
  try {
    if (!req.file) {
      res.status(400).json({ message: "No file uploaded" });
      return;
    }

    const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
    const { id } = req.body;
    // Update user profile with new image
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { profilePicture: imageUrl },
      { new: true }
    );

    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }
 
    res.status(200).json({ message: "Profile picture updated", imageUrl });
    return;
  } catch (error) {
    res.status(500).json({ message: "Error uploading image", error });
  }
};

export { updateData, fetchData, uploadProfileImage };
