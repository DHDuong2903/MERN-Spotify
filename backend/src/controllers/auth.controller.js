import { User } from "../models/user.model.js";

export const authCallback = async (req, res, next) => {
  try {
    const { id, firstName, lastName, imageUrl } = req.body;
    console.log(">>> req.body", req.body);

    // Check if user already exists
    const user = await User.findOne({ clerkId: id });

    if (!user) {
      // register
      await User.create({
        clerkId: id,
        fullName: `${firstName || ""} ${lastName || ""}`,
        imageUrl,
      });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.log("Error in auth callback", error);
    next(error);
  }
};
